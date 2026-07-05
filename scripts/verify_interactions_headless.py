"""端到端 headless 验证：搜索 / pin / 常显面板 / 谱系连线。

用法：/tmp/aa_venv/bin/python scripts/verify_interactions_headless.py [html_path]
默认验证 output/frontier_3d.html。断言失败即非零退出。
"""
from __future__ import annotations

import sys
import tempfile
from pathlib import Path

import plotly.graph_objects as go
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from src import visualize

HTML = (Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "output" / "frontier_3d.html").resolve()


def launch_headless_chromium_for_verification(playwright):
    try:
        return playwright.chromium.launch(headless=True, channel="chromium")
    except Exception:
        return playwright.chromium.launch(headless=True)


def main() -> int:
    assert HTML.exists(), f"找不到 HTML: {HTML}"
    fails: list[str] = []

    def check(cond: bool, msg: str):
        print(("  ✓ " if cond else "  ✗ ") + msg)
        if not cond:
            fails.append(msg)

    with sync_playwright() as pw:
        browser = launch_headless_chromium_for_verification(pw)
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(HTML.as_uri())
        # 等注入与图就绪
        page.wait_for_function("() => window.aaState && window.LINEAGE_DATA && "
                               "document.getElementById('aa-search-input') && "
                               "document.getElementById('aa-cost-metric-select') && "
                               "document.getElementById('aa-speed-metric-select')", timeout=30000)

        print("\n[1] 注入与基础结构")
        data = page.evaluate("() => ({models: LINEAGE_DATA.models.length, "
                             "lineages: Object.keys(LINEAGE_DATA.lineages).length, "
                             "bases: Object.keys(LINEAGE_DATA.base_groups).length})")
        check(data["models"] > 0, f"models(kept) = {data['models']}")
        check(data["lineages"] > 0, f"lineages(>=2 代) = {data['lineages']}")
        check(page.evaluate("() => !!document.getElementById('frontier3d')"), "#frontier3d 存在")
        check(page.evaluate("() => !!document.getElementById('aa-search-input')"), "搜索框存在")
        check(page.evaluate("() => !!document.getElementById('aa-pinned-card-field-controls')"),
              "固定卡片字段配置存在")
        check(page.evaluate("() => !!document.getElementById('aa-pinned-panel')"), "侧栏容器存在")
        check(page.evaluate("() => !!document.getElementById('aa-metric-controls')"), "指标切换控件存在")
        check(page.evaluate("() => !!document.getElementById('frontier-3d-side-panel')"), "右侧控制栏存在")
        check(page.evaluate("() => window.aaState().sidePanelExpanded === true"), "右侧控制栏默认展开")
        search_near_top = page.evaluate("""() => {
            const search = document.getElementById('aa-search-panel').getBoundingClientRect();
            const panel = document.getElementById('frontier-3d-side-panel').getBoundingClientRect();
            return search.top - panel.top < 90;
        }""")
        check(search_near_top, "搜索与 pin 位于右侧控制栏顶部可见区")
        check(page.evaluate("() => getComputedStyle(document.getElementById('aa-standout-panel')).position !== 'fixed'"),
              "突出度面板不再是 fixed overlay")
        check(page.evaluate("() => document.body.textContent.indexOf('仅散点') < 0"), "不存在视觉重复的“仅散点”按钮")

        print("\n[1c] 前沿样式 + 可达曲面单 toggle")
        toggle_contract = page.evaluate("""async () => {
            const gd = document.getElementById('frontier3d');
            const D = window.LINEAGE_DATA;
            const toggleCount = document.querySelectorAll('#aa-achievable-surface-toggle').length;
            const before = gd.data[D.achievable_surface_trace_index].visible;
            await window.aaSetAchievableSurfaceVisible(true);
            const afterOn = gd.data[D.achievable_surface_trace_index].visible;
            await window.aaSetFrontierStyle('hidden');
            const hiddenWire = gd.data[D.frontier_wireframe_trace_index].visible;
            const hiddenMesh = gd.data[D.frontier_mesh_trace_index].visible;
            const surfaceStillOn = gd.data[D.achievable_surface_trace_index].visible;
            await window.aaSetAchievableSurfaceVisible(false);
            const afterOff = gd.data[D.achievable_surface_trace_index].visible;
            await window.aaSetFrontierStyle('wireframe');
            return {toggleCount, before, afterOn, hiddenWire, hiddenMesh, surfaceStillOn, afterOff,
                    state: window.aaState()};
        }""")
        check(toggle_contract["toggleCount"] == 1, "可达前沿曲面只有一个 checkbox toggle")
        check(toggle_contract["before"] in (False, "legendonly"), f"可达曲面默认隐藏 ({toggle_contract['before']!r})")
        check(toggle_contract["afterOn"] is True and toggle_contract["state"]["achievableSurfaceVisible"] is False,
              "可达曲面 toggle 可独立开关，测试结束已关闭")
        check(toggle_contract["hiddenWire"] == "legendonly" and toggle_contract["hiddenMesh"] == "legendonly",
              "隐藏前沿只隐藏线框/实心面")
        check(toggle_contract["surfaceStillOn"] is True, "隐藏前沿不影响已开启的可达曲面")
        check(toggle_contract["afterOff"] == "legendonly", "可达曲面关闭后 trace 回到 legendonly")

        print("\n[1b] 默认指标 + 四种组合")
        default_metric_state = page.evaluate("() => window.aaState()")
        check(default_metric_state["activeMetricKey"] == "effective__effective",
              "默认组合 = 有效运行成本 × 有效速度")
        check(default_metric_state["costAxisField"] == "cost_to_run", "默认成本轴 = cost_to_run")
        check(default_metric_state["speedAxisField"] == "eff_speed", "默认速度轴 = eff_speed")
        for cost_metric_name, speed_metric_name, expected_cost_field, expected_speed_field in [
            ("effective", "effective", "cost_to_run", "eff_speed"),
            ("effective", "raw", "cost_to_run", "output_speed"),
            ("blended", "effective", "blended_price_cache_input_output_7_to_2_to_1", "eff_speed"),
            ("blended", "raw", "blended_price_cache_input_output_7_to_2_to_1", "output_speed"),
        ]:
            metric_state = page.evaluate(
                """async ([costMetricName, speedMetricName]) => {
                    await window.aaSetMetricCombination(costMetricName, speedMetricName);
                    const state = window.aaState();
                    const scene = document.getElementById('frontier3d')._fullLayout.scene;
                    return {...state, xTitle: scene.xaxis.title.text, yTitle: scene.yaxis.title.text,
                            modelCount: window.LINEAGE_DATA.models.length};
                }""",
                [cost_metric_name, speed_metric_name],
            )
            expected_key = f"{cost_metric_name}__{speed_metric_name}"
            check(metric_state["activeMetricKey"] == expected_key,
                  f"{expected_key} 可切换")
            check(metric_state["costAxisField"] == expected_cost_field
                  and metric_state["speedAxisField"] == expected_speed_field,
                  f"{expected_key} 使用正确字段")
            check(metric_state["modelCount"] > 0, f"{expected_key} 有可见模型")

        page.evaluate("() => window.aaSetMetricCombination('effective', 'effective')")
        page.wait_for_function("() => window.aaState().activeMetricKey === 'effective__effective'")

        # 选一个「有谱系（>=2 代）」的 kept 基模型，优先 pro
        pick = page.evaluate("""() => {
            const D = window.LINEAGE_DATA; const bg = D.base_groups; const lin = D.lineages;
            let best = null;
            for (const base of Object.keys(bg)) {
                const m = D.models[bg[base][0]]; const key = m.lineage_key;
                if (lin[key] && lin[key].length >= 2) {
                    const score = (bg[base].length >= 2 ? 100 : 0)
                        + (base.toLowerCase().includes('pro') ? 10 : 0)
                        + Math.min(bg[base].length, 9);
                    if (!best || score > best.score)
                        best = {base, key, gens: lin[key].length, anyName: m.name, score};
                }
            }
            return best;
        }""")
        assert pick, "找不到任何带谱系的 kept 基模型"
        print(f"\n   选定基模型: {pick['base']!r} (谱系 {pick['key']}, {pick['gens']} 代)")

        print("\n[2] 搜索 → 结果列表")
        token = pick["base"].split()[0].lower()  # 如 'gemini'
        page.fill("#aa-search-input", token)
        page.wait_for_timeout(150)
        res_count = page.evaluate("() => { const r = document.getElementById('aa-search-results');"
                                  "return r.style.display !== 'none' ? r.children.length : 0; }")
        check(res_count > 0, f"搜 {token!r} 出 {res_count} 条候选")
        match = page.evaluate("(b) => window.aaMatchBases(b.split(' ')[0]).includes(b)", pick["base"])
        check(match, f"候选含 {pick['base']!r}")
        search_pin_clicked = page.evaluate("""(b) => {
            const rows = Array.from(document.querySelectorAll('.aa-result-row'));
            const row = rows.find((el) => el.dataset.baseModelName === b);
            const button = row && row.querySelector('.aa-search-result-pin-button');
            if (!button) return false;
            button.click();
            return true;
        }""", pick["base"])
        check(search_pin_clicked, "搜索结果含显式 Pin/取消按钮，且可点击")
        page.wait_for_timeout(150)

        print("\n[3] pin → 高亮 + 侧栏 + 谱系线（不写入 3D annotations）")
        st = page.evaluate("() => window.aaState()")
        nvar = page.evaluate("(b) => LINEAGE_DATA.base_groups[b].length", pick["base"])
        check(pick["base"] in st["pinned"], "pinned 集合含该基模型")
        check(st["annCount"] == 0,
              "scene.annotations 保持为空（pin 详情交给侧栏，避免 3D annotation relayout 锁住画布）")
        check(st["highlightLen"] == nvar, f"高亮点 = {st['highlightLen']}（=档位数 {nvar}）")
        check(st["lineageLen"] >= pick["gens"], f"谱系线点数 = {st['lineageLen']}（含 {pick['gens']} 代节点）")
        check(st["lineageNodeLen"] >= pick["gens"],
              f"谱系节点 hover marker = {st['lineageNodeLen']}（含 {pick['gens']} 代节点）")
        if nvar >= 2:
            check(st["reasoningVariantLineLen"] >= nvar,
                  f"reasoning 档位线点数 = {st['reasoningVariantLineLen']}（覆盖 {nvar} 档）")
        panel_shown = page.evaluate("() => getComputedStyle(document.getElementById('aa-pinned-panel')).display != 'none'")
        check(panel_shown, "侧栏可见")
        pinned_card_state = page.evaluate("""() => {
            const cards = Array.from(document.querySelectorAll('.aa-pinned-variant-card'));
            const labels = Array.from(document.querySelectorAll('.aa-pinned-variant-field dt'))
                .map((el) => el.textContent);
            return {
                cardCount: cards.length,
                firstTitle: cards[0] ? cards[0].querySelector('.aa-pinned-variant-title').textContent : '',
                labels,
                visibleFields: window.aaState().pinnedCardVisibleFields,
            };
        }""")
        check(pinned_card_state["cardCount"] == nvar,
              f"已固定缩略卡 = {pinned_card_state['cardCount']}（=档位数 {nvar}）")
        check(bool(pinned_card_state["firstTitle"]), f"缩略卡显示具体模型标题 {pinned_card_state['firstTitle']!r}")
        check("当前速度" in pinned_card_state["labels"] and "当前成本" in pinned_card_state["labels"],
              f"缩略卡默认显示核心字段 {pinned_card_state['labels']}")
        field_toggle_state = page.evaluate("""() => {
            const input = document.querySelector('[data-pinned-card-field-key="selected_cost_metric"]');
            if (!input) return {hasInput: false};
            input.click();
            const labelsAfterOff = Array.from(document.querySelectorAll('.aa-pinned-variant-field dt'))
                .map((el) => el.textContent);
            input.click();
            const labelsAfterOn = Array.from(document.querySelectorAll('.aa-pinned-variant-field dt'))
                .map((el) => el.textContent);
            return {
                hasInput: true,
                offHidden: labelsAfterOff.indexOf('当前成本') < 0,
                onShown: labelsAfterOn.indexOf('当前成本') >= 0,
                visibleFields: window.aaState().pinnedCardVisibleFields,
            };
        }""")
        check(field_toggle_state["hasInput"] and field_toggle_state["offHidden"] and field_toggle_state["onShown"],
              f"固定卡片字段可由用户勾选控制 {field_toggle_state}")

        # 回归：pin 不应通过 scene.annotations 修改 3D scene。历史上 annotation relayout
        # 既可能撑爆坐标轴量程，也可能让 Plotly 的 3D 交互层卡住。
        rng = page.evaluate("""() => {
            const fl = document.getElementById('frontier3d')._fullLayout.scene;
            return {x: fl.xaxis.range, y: fl.yaxis.range};
        }""")
        check(rng["x"][1] < 12, f"pin 后成本轴量程上界 {rng['x'][1]:.2f} < 12（未因 pin 扩张）")
        check(rng["y"][1] < 12, f"pin 后速度轴量程上界 {rng['y'][1]:.2f} < 12（未因 pin 扩张）")

        print("\n[4] hover-only 临时谱系（无 pin 干净态下隔离验证）")
        # 隔离 hover-only：临时取消该 base 的 pin 并清除 hover，使谱系线归零作为基线；
        # 若仍带 pin，则该谱系本就绘出、hover 不新增点（after==before 恒真），无法暴露 hover-only 失效。
        page.evaluate("(b) => window.aaUnpinBase(b)", pick["base"])
        page.evaluate("() => window.aaClearHover()")
        page.wait_for_timeout(220)
        base0 = page.evaluate("() => window.aaState().lineageLen")
        check(base0 == 0, f"无 pin 无 hover 时谱系线点数 = {base0}（应为 0）")
        ok = page.evaluate("(nm) => window.aaShowLineageForName(nm)", pick["anyName"])
        page.wait_for_timeout(100)
        hovered = page.evaluate("() => window.aaState().lineageLen")
        hovered_reasoning = page.evaluate("() => window.aaState().reasoningVariantLineLen")
        # hover-only 必须把谱系线从 0 拉出 >0 且覆盖该谱系节点（>= 代数）
        check(ok and hovered > 0 and hovered >= pick["gens"],
              f"hover-only 谱系线点数 {base0} → {hovered}（含 {pick['gens']} 代节点）")
        if nvar >= 2:
            check(hovered_reasoning >= nvar,
                  f"hover-only reasoning 档位线点数 = {hovered_reasoning}（覆盖 {nvar} 档）")
            reasoning_style = page.evaluate("""() => {
                const t = document.getElementById('frontier3d').data[LINEAGE_DATA.reasoning_variant_line_trace_index];
                return {color: t.line.color, name: t.name, mode: t.mode};
            }""")
            check("168,54,170" in reasoning_style["color"] and reasoning_style["name"] == "Reasoning 档位",
                  f"reasoning 档位线使用固定非厂商色 ({reasoning_style['color']})")
            check(reasoning_style["mode"] == "lines",
                  "reasoning 档位使用纯 3D line，避免 null marker 触发 WebGL/Safari shader 错误")
        page.evaluate("() => window.aaClearHover()")
        page.wait_for_timeout(220)
        cleared_state = page.evaluate("() => window.aaState()")
        check(cleared_state["lineageLen"] == 0, f"清除 hover 后谱系线点数回到 {cleared_state['lineageLen']}（应为 0）")
        check(cleared_state["reasoningVariantLineLen"] == 0,
              f"清除 hover 后 reasoning 档位线点数回到 {cleared_state['reasoningVariantLineLen']}（应为 0）")

        print("\n[4b] hover 事件去重 + rAF（防 gl3d 重入：卡死/无法旋转/标签飞左上角）")
        # 包裹 Plotly.restyle 统计针对谱系线 trace(LL) 的重画次数：在 plotly_hover 里同步
        # restyle 会触发 gl3d 重绘→再次 fire hover→无限重入。去重应让「相同点重复 hover」
        # 不再重画，从而打断该循环。用真实事件处理器 aaOnHover/aaOnUnhover 驱动（含 rAF）。
        page.evaluate("""() => {
            const LL = LINEAGE_DATA.lineage_line_trace_index;
            window.__llRestyle = 0;
            if (!window.__restyleWrapped) {
                const orig = Plotly.restyle;
                Plotly.restyle = function (g, u, tr) {
                    if (Array.isArray(tr) && tr.indexOf(LL) >= 0) window.__llRestyle++;
                    return orig.apply(this, arguments);
                };
                window.__restyleWrapped = true;
            }
        }""")
        ev = {"points": [{"customdata": [pick["anyName"]]}]}
        page.evaluate("() => { window.__llRestyle = 0; }")   # 干净态（无 pin 无 hover）
        page.evaluate("(ev) => window.aaOnHover(ev)", ev)
        page.wait_for_timeout(120)
        c1 = page.evaluate("() => window.__llRestyle")
        len1 = page.evaluate("() => window.aaState().lineageLen")
        check(c1 == 1 and len1 > 0, f"首次 hover：谱系重画 1 次且画出谱系（restyle={c1}, len={len1}）")
        page.evaluate("(ev) => window.aaOnHover(ev)", ev)    # 相同点二次 hover → 应去重
        page.wait_for_timeout(120)
        c2 = page.evaluate("() => window.__llRestyle")
        check(c2 == c1, f"相同点二次 hover 被去重、不再重画（restyle 仍={c2}）— 打断 gl3d 重入循环")
        page.evaluate("() => window.aaOnUnhover()")          # gl3d 新增谱系 trace 可能触发瞬时 unhover
        page.wait_for_timeout(30)
        page.evaluate("(ev) => window.aaOnHover(ev)", ev)    # 光标仍在同一点上时，新 hover 应取消清空
        page.wait_for_timeout(140)
        c_transient = page.evaluate("() => window.__llRestyle")
        len_transient = page.evaluate("() => window.aaState().lineageLen")
        check(
            c_transient == c2 and len_transient > 0,
            f"瞬时 unhover 被后续 hover 抵消，谱系不闪烁（restyle={c_transient}, len={len_transient}）",
        )
        page.evaluate("() => window.aaOnUnhover()")
        page.wait_for_timeout(260)
        c3 = page.evaluate("() => window.__llRestyle")
        len3 = page.evaluate("() => window.aaState().lineageLen")
        check(c3 == c2 + 1 and len3 == 0, f"unhover：重画 1 次并清空谱系（restyle={c3}, len={len3}）")
        page.evaluate("() => window.aaOnUnhover()")          # 重复 unhover → 应去重
        page.wait_for_timeout(120)
        c4 = page.evaluate("() => window.__llRestyle")
        check(c4 == c3, f"重复 unhover 被去重（restyle 仍={c4}）")

        print("\n[4c] hover 谱系重画不重置用户旋转后的 3D camera")
        page.evaluate("() => window.aaClearHover()")
        camera_result = page.evaluate("""async (nm) => {
            const gd = document.getElementById('frontier3d');
            function cloneCamera() {
                return JSON.parse(JSON.stringify(gd._fullLayout.scene.camera));
            }
            function closeNumber(a, b) {
                return Math.abs(Number(a) - Number(b)) < 1e-6;
            }
            function closeVector(a, b) {
                return closeNumber(a.x, b.x) && closeNumber(a.y, b.y) && closeNumber(a.z, b.z);
            }
            function closeCamera(a, b) {
                return closeVector(a.eye, b.eye) && closeVector(a.center, b.center) && closeVector(a.up, b.up);
            }
            const initialCamera = cloneCamera();
            const userRotatedCamera = {
                up: {x: 0, y: 0, z: 1},
                center: {x: 0.08, y: -0.12, z: 0.03},
                eye: {x: -1.35, y: 2.15, z: 0.82},
            };
            await Plotly.relayout(gd, {"scene.camera": userRotatedCamera});
            await new Promise(resolve => setTimeout(resolve, 80));
            const beforeHoverCamera = cloneCamera();
            window.aaOnHover({points: [{customdata: [nm]}]});
            await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 140)));
            const afterHoverCamera = cloneCamera();
            window.aaOnUnhover();
            await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 140)));
            const afterUnhoverCamera = cloneCamera();
            return {
                beforeHoverCamera,
                afterHoverCamera,
                afterUnhoverCamera,
                userCameraChanged: !closeCamera(initialCamera, beforeHoverCamera),
                hoverPreserved: closeCamera(beforeHoverCamera, afterHoverCamera),
                unhoverPreserved: closeCamera(beforeHoverCamera, afterUnhoverCamera),
            };
        }""", pick["anyName"])
        check(
            camera_result["userCameraChanged"],
            "测试先把 3D camera 改到非初始视角（不是初始视角假通过）",
        )
        check(
            camera_result["hoverPreserved"],
            "hover 后 camera 保持用户旋转视角（不回到初始 view）",
        )
        check(
            camera_result["unhoverPreserved"],
            "unhover 后 camera 仍保持用户旋转视角",
        )

        print("\n[4c-guard] hover/切指标/拖权重期间 app 不再显式回填 scene.camera（stale 快照回填=延迟视角回默认的根因）")
        # 回归护栏：旧代码用 restoreSceneCameraSnapshot 在异步 restyle 完成后 Plotly.relayout
        # 回填 scene.camera；一旦快照在页面加载/拖拽前被捕获成默认视角，这次延迟回填就把用户
        # 视角强行拉回默认（= 用户报的「hover 后 1-2 秒回默认」）。改由 uirevision 独力保视角后，
        # app 在任何交互路径下都不应再显式 relayout(scene.camera)。装 spy 计数，应恒为 0。
        relayout_probe = page.evaluate("""async (nm) => {
            const gd = document.getElementById('frontier3d');
            const origRelayout = Plotly.relayout;
            let cameraRelayoutCount = 0;
            Plotly.relayout = function (graphDiv, update) {
                try {
                    if (update && Object.keys(update).some(function (k) {
                        return k === "scene.camera" || k.indexOf("scene.camera.") === 0;
                    })) cameraRelayoutCount += 1;
                } catch (e) {}
                return origRelayout.apply(this, arguments);
            };
            window.aaOnHover({points: [{customdata: [nm]}]});
            await new Promise(r => requestAnimationFrame(() => setTimeout(r, 160)));
            window.aaOnUnhover();
            await new Promise(r => requestAnimationFrame(() => setTimeout(r, 160)));
            window.aaSelectStandoutMetric('A');
            await new Promise(r => setTimeout(r, 120));
            window.aaSetWeights(4, 1, 1);
            await new Promise(r => setTimeout(r, 120));
            // 还原全局状态到默认（指标C + 权重1,1,1），避免污染后续 [7] 的「默认 w=1」断言
            window.aaSetWeights(1, 1, 1);
            window.aaSelectStandoutMetric('C');
            await new Promise(r => setTimeout(r, 120));
            Plotly.relayout = origRelayout;
            return {cameraRelayoutCount: cameraRelayoutCount};
        }""", pick["anyName"])
        check(
            relayout_probe["cameraRelayoutCount"] == 0,
            f"hover/切指标/拖权重期间 app 未显式回填 scene.camera（实测 {relayout_probe['cameraRelayoutCount']} 次，应为 0；视角保持交给 uirevision）",
        )

        print("\n[4d] 坐标轴范围固定（画跨界谱系不重缩放 → 消除 Qwen 类抖动）")
        ar = page.evaluate("""() => {
            const s = document.getElementById('frontier3d')._fullLayout.scene;
            return {x: s.xaxis.autorange, y: s.yaxis.autorange, z: s.zaxis.autorange};
        }""")
        check(ar["x"] is False and ar["y"] is False and ar["z"] is False,
              f"三轴 autorange 已关闭：x={ar['x']} y={ar['y']} z={ar['z']}（范围固定）")
        # 找一条「含落在 kept 散点范围外节点」的谱系（正是 Qwen 类抖动诱因），
        # 画它前后比较坐标轴范围是否纹丝不动。
        probe = page.evaluate("""() => {
            const D = window.LINEAGE_DATA;
            const cs = D.models.map(m => m.x), ss = D.models.map(m => m.y);
            const cmin=Math.min(...cs), cmax=Math.max(...cs), smin=Math.min(...ss), smax=Math.max(...ss);
            for (const k of Object.keys(D.lineages)) {
                const nodes = D.lineages[k];
                if (!nodes.some(n => n.x<cmin || n.x>cmax || n.y<smin || n.y>smax)) continue;
                const m = D.models.find(mm => mm.lineage_key === k);
                if (m) return {key:k, name:m.name, gens:nodes.length};
            }
            return null;
        }""")
        if probe:
            print(f"   跨界谱系: {probe['key']} 经 {probe['name']!r}（{probe['gens']} 代）")
            before = page.evaluate("""() => {
                const s = document.getElementById('frontier3d')._fullLayout.scene;
                return {x: s.xaxis.range.slice(), y: s.yaxis.range.slice()};
            }""")
            page.evaluate("(nm) => window.aaShowLineageForName(nm)", probe["name"])
            page.wait_for_timeout(120)
            after = page.evaluate("""() => {
                const s = document.getElementById('frontier3d')._fullLayout.scene;
                return {x: s.xaxis.range.slice(), y: s.yaxis.range.slice(),
                        len: (window.aaState().lineageLen)};
            }""")
            same = (abs(before["x"][0]-after["x"][0])<1e-6 and abs(before["x"][1]-after["x"][1])<1e-6
                    and abs(before["y"][0]-after["y"][0])<1e-6 and abs(before["y"][1]-after["y"][1])<1e-6)
            check(after["len"] > 0, f"跨界谱系已画出（{after['len']} 点）")
            check(same, f"画跨界谱系后坐标轴范围不变 x:{before['x']}→{after['x']} y:{before['y']}→{after['y']}")
            page.evaluate("() => window.aaClearHover()")
            page.wait_for_timeout(60)
        else:
            check(True, "（本产物无跨界谱系，范围固定性已由 autorange=False 覆盖）")

        # 恢复步骤 [3] 的 pin 状态，供步骤 [5] 验证 unpin 清空
        page.evaluate("(b) => window.aaPinBase(b)", pick["base"])
        page.wait_for_timeout(100)

        print("\n[5] unpin → 清空")
        page.evaluate("() => window.aaClearHover()")
        page.evaluate("(b) => window.aaUnpinBase(b)", pick["base"])
        page.wait_for_timeout(100)
        st2 = page.evaluate("() => window.aaState()")
        check(st2["annCount"] == 0, "scene.annotations 仍为空")
        check(st2["highlightLen"] == 0, "高亮已清空")
        check(len(st2["pinned"]) == 0, "pinned 集合已空")

        print("\n[5b] click 节点 → pin / 再 click → unpin，且 camera 不重置")
        click_probe = page.evaluate("""async ([nm, base]) => {
            const gd = document.getElementById('frontier3d');
            const clone = () => JSON.parse(JSON.stringify(gd._fullLayout.scene.camera));
            const cn = (a, b) => Math.abs(Number(a) - Number(b)) < 1e-6;
            const cv = (a, b) => cn(a.x, b.x) && cn(a.y, b.y) && cn(a.z, b.z);
            const cc = (a, b) => cv(a.eye, b.eye) && cv(a.center, b.center) && cv(a.up, b.up);
            const rotated = {up: {x: 0, y: 0, z: 1}, center: {x: 0.06, y: -0.07, z: 0.02},
                             eye: {x: -1.2, y: 2.05, z: 0.95}};
            await Plotly.relayout(gd, {"scene.camera": rotated});
            await new Promise(r => setTimeout(r, 80));
            const before = clone();
            const staleCover = document.createElement('div');
            staleCover.className = 'dragcover';
            staleCover.style.position = 'fixed';
            staleCover.style.inset = '0';
            staleCover.style.zIndex = '999999';
            staleCover.style.pointerEvents = 'auto';
            document.body.appendChild(staleCover);
            window.aaOnClick({points: [{customdata: [nm]}]});
            await new Promise(r => setTimeout(r, 260));
            const afterPin = clone();
            const pinnedAfterClick = window.aaState().pinned.indexOf(base) >= 0;
            const dragCoverAfterPin = document.querySelectorAll('.dragcover').length;
            const glplotAfterPin = gd._fullLayout.scene._scene.glplot;
            const interactionAfterPin = {
                buttons: glplotAfterPin.mouseListener.buttons,
                rotating: glplotAfterPin._mouseRotating,
                stopped: glplotAfterPin._stopped,
            };
            const delayedCover = document.createElement('div');
            delayedCover.className = 'dragcover';
            delayedCover.style.position = 'fixed';
            delayedCover.style.inset = '0';
            delayedCover.style.zIndex = '999999';
            delayedCover.style.pointerEvents = 'auto';
            document.body.appendChild(delayedCover);
            const glplotDuringNewDrag = gd._fullLayout.scene._scene.glplot;
            glplotDuringNewDrag.mouseListener.buttons = 1;
            glplotDuringNewDrag._prevButtons = 1;
            glplotDuringNewDrag._mouseRotating = true;
            glplotDuringNewDrag._stopped = true;
            await new Promise(r => setTimeout(r, 1700));
            const dragCoverAfterDelayedPlotlyCover = document.querySelectorAll('.dragcover').length;
            const interactionAfterDelayedCleanups = {
                buttons: glplotDuringNewDrag.mouseListener.buttons,
                previousButtons: glplotDuringNewDrag._prevButtons,
                rotating: glplotDuringNewDrag._mouseRotating,
                stopped: glplotDuringNewDrag._stopped,
            };
            glplotDuringNewDrag.mouseListener.buttons = 0;
            glplotDuringNewDrag._prevButtons = 0;
            glplotDuringNewDrag._mouseRotating = false;
            glplotDuringNewDrag._stopped = false;
            window.aaOnClick({points: [{customdata: [nm]}]});
            await new Promise(r => setTimeout(r, 120));
            const afterUnpin = clone();
            const unpinnedAfterSecondClick = window.aaState().pinned.indexOf(base) < 0;
            return {
                pinnedAfterClick,
                unpinnedAfterSecondClick,
                dragCoverAfterPin,
                dragCoverAfterDelayedPlotlyCover,
                interactionAfterPin,
                interactionAfterDelayedCleanups,
                pinPreserved: cc(before, afterPin),
                unpinPreserved: cc(before, afterUnpin)
            };
        }""", [pick["anyName"], pick["base"]])
        check(click_probe["pinnedAfterClick"], "click 节点 pin 对应 base group")
        check(click_probe["unpinnedAfterSecondClick"], "再次 click 已 pin 同组节点会 unpin")
        check(click_probe["dragCoverAfterPin"] == 0, "click pin 后清理 Plotly stale dragcover，页面不被透明层锁住")
        check(click_probe["interactionAfterPin"]["buttons"] == 0
              and click_probe["interactionAfterPin"]["rotating"] is False
              and click_probe["interactionAfterPin"]["stopped"] is False,
              f"click pin 后释放 gl3d 鼠标状态 {click_probe['interactionAfterPin']}")
        check(click_probe["dragCoverAfterDelayedPlotlyCover"] == 0,
              "click pin 后较晚出现的 Plotly dragcover 也会被清理，避免 3D 画布冻结")
        check(click_probe["interactionAfterDelayedCleanups"]["previousButtons"] == 1
              and click_probe["interactionAfterDelayedCleanups"]["rotating"] is True
              and click_probe["interactionAfterDelayedCleanups"]["stopped"] is True,
              f"延迟清理只移除 dragcover，不打断用户新拖拽状态 {click_probe['interactionAfterDelayedCleanups']}")
        check(click_probe["pinPreserved"], "click pin 后 camera 保持用户视角")
        check(click_probe["unpinPreserved"], "click unpin 后 camera 保持用户视角")
        overlay_probe = page.evaluate("""async ([nm, base]) => {
            const gd = document.getElementById('frontier3d');
            window.aaPinBase(base);
            await new Promise(r => setTimeout(r, 160));
            const HL = LINEAGE_DATA.pinned_highlight_trace_index;
            const LN = LINEAGE_DATA.lineage_node_trace_index;
            const firstNonNull = (items) => (items || []).find((item) => item);
            const hlCd = firstNonNull(gd.data[HL].customdata);
            const lnCd = firstNonNull(gd.data[LN].customdata);
            const hiddenNodeCd = (gd.data[LN].customdata || []).find((item) => item && item[7] === 'no');
            const beforePinned = window.aaState().pinned.indexOf(base) >= 0;
            if (lnCd) window.aaOnHover({points: [{customdata: lnCd}]});
            await new Promise(r => setTimeout(r, 120));
            const hoverViaLineageOverlayWorked = window.aaState().hoverKey !== null;
            if (hlCd) window.aaOnClick({points: [{customdata: hlCd}]});
            await new Promise(r => setTimeout(r, 160));
            const unpinnedViaHighlightOverlay = window.aaState().pinned.indexOf(base) < 0;
            window.aaUnpinBase(base);
            window.aaClearHover();
            return {
                beforePinned,
                hasHighlightCustomdata: !!hlCd,
                hasLineageNodeCustomdata: !!lnCd,
                hasHiddenLineageNodeCustomdata: !!hiddenNodeCd,
                lineageNodeHoverTemplate: gd.data[LN].hovertemplate || '',
                hoverViaLineageOverlayWorked,
                unpinnedViaHighlightOverlay,
            };
        }""", [pick["anyName"], pick["base"]])
        check(overlay_probe["beforePinned"], "覆盖层回归先建立 pin 状态")
        check(overlay_probe["hasHighlightCustomdata"], "高亮覆盖 trace 带 customdata，不吞 click")
        check(overlay_probe["hasLineageNodeCustomdata"], "谱系节点 trace 带 customdata，不吞 hover")
        check("谱系节点" in overlay_probe["lineageNodeHoverTemplate"] and "kept" in overlay_probe["lineageNodeHoverTemplate"],
              "谱系节点 trace 带完整 hover tooltip（含 hidden/kept 信息）")
        check(overlay_probe["hasHiddenLineageNodeCustomdata"], "被谱系带出的 hidden 节点也有 hover customdata")
        check(overlay_probe["hoverViaLineageOverlayWorked"], "hover 命中谱系节点 trace 也能更新谱系状态")
        check(overlay_probe["unpinnedViaHighlightOverlay"], "click 命中高亮覆盖 trace 也能 unpin")
        page.locator("#aa-side-panel-toggle").click()
        page.wait_for_timeout(80)
        check(page.evaluate("() => window.aaState().sidePanelExpanded === false"),
              "click pin 后右侧控制栏按钮仍可交互")
        page.locator("#aa-side-panel-toggle").click()
        page.wait_for_timeout(80)
        check(page.evaluate("() => window.aaState().sidePanelExpanded === true"),
              "右侧控制栏可重新展开")

        print("\n[6] trace 下标回归（HL/LL 在末尾，前沿按钮目标未被波及）")
        reg = page.evaluate("""() => {
            const gd = document.getElementById('frontier3d');
            const n = gd.data.length;
            const HL = LINEAGE_DATA.pinned_highlight_trace_index;
            const LL = LINEAGE_DATA.lineage_line_trace_index;
            const LN = LINEAGE_DATA.lineage_node_trace_index;
            const RV = LINEAGE_DATA.reasoning_variant_line_trace_index;
            const names = gd.data.map(t => t.name);
            // 前沿样式按钮的目标下标（restyle args[1]）应全部 < HL
            let maxBtnTarget = -1;
            (gd.layout.updatemenus || []).forEach(um => (um.buttons||[]).forEach(b => {
                const tgt = b.args && b.args[1]; if (Array.isArray(tgt)) tgt.forEach(i => { if (i > maxBtnTarget) maxBtnTarget = i; });
            }));
            return {
                n, HL, LL, LN, RV,
                hlName: names[HL], llName: names[LL], lnName: names[LN], rvName: names[RV],
                llMode: gd.data[LL].mode, lnMode: gd.data[LN].mode, rvMode: gd.data[RV].mode,
                maxBtnTarget
            };
        }""")
        check(reg["hlName"] == "已固定", f"HL trace[{reg['HL']}] = {reg['hlName']!r}")
        check(reg["llName"] == "谱系连线", f"LL trace[{reg['LL']}] = {reg['llName']!r}")
        check(reg["lnName"] == "谱系节点", f"LN trace[{reg['LN']}] = {reg['lnName']!r}")
        check(reg["rvName"] == "Reasoning 档位", f"RV trace[{reg['RV']}] = {reg['rvName']!r}")
        check(reg["llMode"] == "lines" and reg["lnMode"] == "markers" and reg["rvMode"] == "lines",
              f"动态谱系使用纯线 + 独立节点 hover trace：LL={reg['llMode']} LN={reg['lnMode']} RV={reg['rvMode']}")
        check(reg["HL"] == reg["n"] - 4 and reg["LL"] == reg["n"] - 3
              and reg["LN"] == reg["n"] - 2 and reg["RV"] == reg["n"] - 1,
              "HL/LL/LN/RV 为末尾四个 trace")
        check(reg["maxBtnTarget"] < reg["HL"], f"前沿按钮最大目标下标 {reg['maxBtnTarget']} < HL {reg['HL']}（不波及新 trace）")

        print("\n[7] 突出度：控件 + 视觉编码（光环大小）+ 排行 + 可调权重")
        check(page.evaluate("() => !!document.getElementById('aa-standout-panel')"), "突出度面板存在")
        check(page.evaluate("() => !!document.getElementById('aa-standout-metric-select')"), "指标选择器存在")
        check(page.evaluate("() => !!document.getElementById('aa-weight-slider-intelligence')"), "智能权重滑杆存在")
        st7 = page.evaluate("() => window.aaState()")
        check(st7["standoutMetric"] == "C", f"默认突出度指标 = 趋势残差C（实为 {st7['standoutMetric']}）")
        check(st7["frontierCount"] > 0, f"前沿模型数 = {st7['frontierCount']}")
        # 视觉编码：Pareto 光环 marker.size 已数组化，长度=前沿点数
        check(st7["paretoMarkerSizeLen"] == st7["frontierCount"],
              f"光环 marker.size 数组长度 {st7['paretoMarkerSizeLen']} = 前沿点数 {st7['frontierCount']}")
        # hover 面板含四个突出度值（检查 hovertemplate 文本注入）
        has_hover = page.evaluate("""() => {
            const gd = document.getElementById('frontier3d');
            const t = gd.data[LINEAGE_DATA.pareto_emphasis_trace_index].hovertemplate || '';
            return t.includes('趋势残差') && t.includes('智能抬升')
                && t.includes('加权超体积') && t.includes('垂距');
        }""")
        check(has_hover, "hover 模板含四个突出度值（趋势残差/智能抬升/加权超体积/垂距）")

        # 切指标 → 换榜 + 光环重设
        rank_c = page.evaluate("() => window.aaStandoutRanking()")
        page.evaluate("() => window.aaSelectStandoutMetric('B')")
        page.wait_for_timeout(60)
        rank_b = page.evaluate("() => window.aaStandoutRanking()")
        st_b = page.evaluate("() => window.aaState()")
        check(st_b["standoutMetric"] == "B", "切到智能抬升B")
        check(st_b["paretoMarkerSizeLen"] == st_b["frontierCount"], "切指标后光环仍随前沿数组化")
        names_c = [r["name"] for r in rank_c["ranking"]]
        names_b = [r["name"] for r in rank_b["ranking"]]
        check(names_c[:5] != names_b[:5] or names_c != names_b,
              f"切指标换榜：C榜首5 {names_c[:3]}… ≠ B榜首5 {names_b[:3]}…")

        # 加权超体积：默认 w=1 序 vs 重压智能轴 w=(4,1,1) 应重排
        page.evaluate("() => window.aaSelectStandoutMetric('A')")
        page.wait_for_timeout(60)
        st_a = page.evaluate("() => window.aaState()")
        check(st_a["standoutMetric"] == "A", "切到加权超体积A")
        rank_a_w1 = page.evaluate("() => window.aaStandoutRanking()")
        check(abs(rank_a_w1["weights"]["intelligence"] - 1) < 1e-9, "A 默认权重 w=1")
        page.evaluate("() => window.aaSetWeights(4, 1, 1)")
        page.wait_for_timeout(60)
        rank_a_w4 = page.evaluate("() => window.aaStandoutRanking()")
        st_a4 = page.evaluate("() => window.aaState()")
        check(abs(st_a4["standoutWeights"]["intelligence"] - 4) < 1e-9, "重压智能轴 w_intelligence=4 已生效")
        order_w1 = [r["name"] for r in rank_a_w1["ranking"]]
        order_w4 = [r["name"] for r in rank_a_w4["ranking"]]
        check(order_w1 != order_w4,
              f"指数加权重排：w=1 序 ≠ w=(4,1,1) 序（前3：{order_w1[:3]} → {order_w4[:3]}）")
        # 前沿成员数不因权重变化（保序性）
        pos_w1 = sum(1 for r in rank_a_w1["ranking"] if r["value"] and r["value"] > 0)
        pos_w4 = sum(1 for r in rank_a_w4["ranking"] if r["value"] and r["value"] > 0)
        check(pos_w1 == pos_w4, f"加权不改前沿成员数（w=1 有 {pos_w1} 个正贡献，w=4 有 {pos_w4} 个）")

        # 权重仅对 A 可用：切回 C 后滑杆禁用
        page.evaluate("() => window.aaSelectStandoutMetric('C')")
        page.wait_for_timeout(30)
        disabled_c = page.evaluate("() => document.getElementById('aa-weight-slider-intelligence').disabled")
        check(disabled_c is True, "切回趋势残差C 后权重滑杆禁用（仅加权超体积可调）")
        page.evaluate("() => window.aaSelectStandoutMetric('A')")
        page.wait_for_timeout(30)
        enabled_a = page.evaluate("() => document.getElementById('aa-weight-slider-intelligence').disabled")
        check(enabled_a is False, "切到加权超体积A 后权重滑杆可用")

        # 突出度光环 restyle 不重置用户旋转后的 3D camera（复用 fd72e24 的视角保持契约，
        # 覆盖切指标/拖权重滑杆这条新 Plotly.restyle 路径）
        standout_camera = page.evaluate("""async () => {
            const gd = document.getElementById('frontier3d');
            const clone = () => JSON.parse(JSON.stringify(gd._fullLayout.scene.camera));
            const cn = (a, b) => Math.abs(Number(a) - Number(b)) < 1e-6;
            const cv = (a, b) => cn(a.x, b.x) && cn(a.y, b.y) && cn(a.z, b.z);
            const cc = (a, b) => cv(a.eye, b.eye) && cv(a.center, b.center) && cv(a.up, b.up);
            const initial = clone();
            const rotated = {up: {x: 0, y: 0, z: 1}, center: {x: 0.05, y: -0.1, z: 0.02},
                             eye: {x: -1.4, y: 2.0, z: 0.9}};
            await Plotly.relayout(gd, {"scene.camera": rotated});
            await new Promise(r => setTimeout(r, 80));
            const before = clone();
            window.aaSelectStandoutMetric('B');   // 切指标 → 光环 restyle
            await new Promise(r => requestAnimationFrame(() => setTimeout(r, 140)));
            const afterSelect = clone();
            window.aaSelectStandoutMetric('A');
            window.aaSetWeights(4, 1, 1);          // 拖权重 → 加权 restyle
            await new Promise(r => requestAnimationFrame(() => setTimeout(r, 140)));
            const afterWeights = clone();
            return {
                userCameraChanged: !cc(initial, before),
                selectPreserved: cc(before, afterSelect),
                weightsPreserved: cc(before, afterWeights),
            };
        }""")
        check(standout_camera["userCameraChanged"], "测试先把 3D camera 改到非初始视角（非假通过）")
        check(standout_camera["selectPreserved"], "切突出度指标后 camera 保持用户旋转视角")
        check(standout_camera["weightsPreserved"], "拖权重滑杆后 camera 仍保持用户旋转视角")

        # 切成本/速度口径后光环与排行同步刷新（前沿点数随之变、编码仍一致）
        page.evaluate("() => window.aaSetMetricCombination('blended', 'raw')")
        page.wait_for_function("() => window.aaState().activeMetricKey === 'blended__raw'")
        page.wait_for_timeout(60)
        st_switch = page.evaluate("() => window.aaState()")
        check(st_switch["paretoMarkerSizeLen"] == st_switch["frontierCount"],
              f"切口径后光环 {st_switch['paretoMarkerSizeLen']} = 新前沿数 {st_switch['frontierCount']}（同步刷新）")
        page.evaluate("() => window.aaSetMetricCombination('effective', 'effective')")
        page.wait_for_function("() => window.aaState().activeMetricKey === 'effective__effective'")

        check(not errors, f"无 JS 运行时错误（捕获 {len(errors)} 条）")
        if errors:
            for e in errors[:5]:
                print("    JS error:", e)

        browser.close()

    with tempfile.TemporaryDirectory() as temporary_directory_name:
        legacy_html_path = Path(temporary_directory_name) / "legacy_payload_only.html"
        visualize.write_html(
            go.Figure(data=[go.Scatter3d(x=[1.0], y=[2.0], z=[3.0])]),
            legacy_html_path,
            payload={"models": [], "base_groups": {}, "lineages": {}},
        )
        with sync_playwright() as pw:
            browser = launch_headless_chromium_for_verification(pw)
            page = browser.new_page(viewport={"width": 900, "height": 640})
            errors: list[str] = []
            page.on("pageerror", lambda e: errors.append(str(e)))
            page.goto(legacy_html_path.resolve().as_uri())
            page.wait_for_function("() => window.aaState", timeout=30000)
            legacy_state = page.evaluate("() => window.aaState()")
            check(
                legacy_state["reasoningVariantLineLen"] == 0
                and legacy_state["highlightLen"] == 0
                and legacy_state["paretoMarkerSizeLen"] == 0,
                "legacy write_html payload 缺少新增 trace index 时 aaState 可安全返回空状态",
            )
            check(not errors, f"legacy write_html payload 无 JS 运行时错误（捕获 {len(errors)} 条）")
            if errors:
                for e in errors[:5]:
                    print("    legacy JS error:", e)
            browser.close()

    print("\n" + ("✅ 全部通过" if not fails else f"❌ {len(fails)} 项失败"))
    return 0 if not fails else 1


if __name__ == "__main__":
    raise SystemExit(main())
