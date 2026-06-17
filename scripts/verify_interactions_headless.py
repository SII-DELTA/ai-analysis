"""端到端 headless 验证：搜索 / pin / 常显面板 / 谱系连线。

用法：/tmp/aa_venv/bin/python scripts/verify_interactions_headless.py [html_path]
默认验证 output/frontier_3d.html。断言失败即非零退出。
"""
from __future__ import annotations

import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
HTML = (Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "output" / "frontier_3d.html").resolve()


def main() -> int:
    assert HTML.exists(), f"找不到 HTML: {HTML}"
    fails: list[str] = []

    def check(cond: bool, msg: str):
        print(("  ✓ " if cond else "  ✗ ") + msg)
        if not cond:
            fails.append(msg)

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(HTML.as_uri())
        # 等注入与图就绪
        page.wait_for_function("() => window.aaState && window.LINEAGE_DATA && "
                               "document.getElementById('aa-search-input')", timeout=30000)

        print("\n[1] 注入与基础结构")
        data = page.evaluate("() => ({models: LINEAGE_DATA.models.length, "
                             "lineages: Object.keys(LINEAGE_DATA.lineages).length, "
                             "bases: Object.keys(LINEAGE_DATA.base_groups).length})")
        check(data["models"] > 0, f"models(kept) = {data['models']}")
        check(data["lineages"] > 0, f"lineages(>=2 代) = {data['lineages']}")
        check(page.evaluate("() => !!document.getElementById('frontier3d')"), "#frontier3d 存在")
        check(page.evaluate("() => !!document.getElementById('aa-search-input')"), "搜索框存在")
        check(page.evaluate("() => !!document.getElementById('aa-pinned-panel')"), "侧栏容器存在")

        # 选一个「有谱系（>=2 代）」的 kept 基模型，优先 pro
        pick = page.evaluate("""() => {
            const D = window.LINEAGE_DATA; const bg = D.base_groups; const lin = D.lineages;
            let best = null;
            for (const base of Object.keys(bg)) {
                const m = D.models[bg[base][0]]; const key = m.lineage_key;
                if (lin[key] && lin[key].length >= 2) {
                    if (!best || (base.toLowerCase().includes('pro') && !best.base.toLowerCase().includes('pro')))
                        best = {base, key, gens: lin[key].length, anyName: m.name};
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

        print("\n[3] pin → 高亮 + 注释 + 侧栏 + 谱系线")
        page.evaluate("(b) => window.aaPinBase(b)", pick["base"])
        page.wait_for_timeout(150)
        st = page.evaluate("() => window.aaState()")
        nvar = page.evaluate("(b) => LINEAGE_DATA.base_groups[b].length", pick["base"])
        check(pick["base"] in st["pinned"], "pinned 集合含该基模型")
        check(st["annCount"] == nvar, f"scene.annotations = {st['annCount']}（=档位数 {nvar}）")
        check(st["highlightLen"] == nvar, f"高亮点 = {st['highlightLen']}（=档位数 {nvar}）")
        check(st["lineageLen"] >= pick["gens"], f"谱系线点数 = {st['lineageLen']}（含 {pick['gens']} 代节点）")
        panel_shown = page.evaluate("() => getComputedStyle(document.getElementById('aa-pinned-panel')).display != 'none'")
        check(panel_shown, "侧栏可见")

        # 回归：pin 注入 scene.annotations 后坐标轴量程不得爆炸。
        # 注释坐标在对数轴上须用 log10(value)；若误传原始值，Plotly 会把它当 log10 解读，
        # 把注释放到 10^value（如成本 $256 → 10^256），自动量程冲到天文数字、所有节点被挤到角落。
        # 对数轴的 _fullLayout range 以 log10 为单位，正常上界仅个位数；阈值 < 12 可稳健区分。
        rng = page.evaluate("""() => {
            const fl = document.getElementById('frontier3d')._fullLayout.scene;
            return {x: fl.xaxis.range, y: fl.yaxis.range,
                    xlog: LINEAGE_DATA.cost_axis_is_log, ylog: LINEAGE_DATA.speed_axis_is_log};
        }""")
        if rng["xlog"]:
            check(rng["x"][1] < 12, f"pin 后成本轴(对数)量程上界 {rng['x'][1]:.2f} < 12（未因注释坐标爆炸）")
        if rng["ylog"]:
            check(rng["y"][1] < 12, f"pin 后速度轴(对数)量程上界 {rng['y'][1]:.2f} < 12（未因注释坐标爆炸）")
        # 注释坐标须与高亮 marker 的数据位置一致（同一节点）：对数轴下注释应为 log10(节点值)
        coord_ok = page.evaluate("""() => {
            const gd = document.getElementById('frontier3d');
            const anns = (gd._fullLayout.scene.annotations) || [];
            const HL = LINEAGE_DATA.pinned_highlight_trace_index;
            const xs = gd.data[HL].x || [];
            if (!anns.length || !xs.length) return false;
            const a = anns[0];
            // 找到与该注释 z 匹配的高亮点，比较 x（对数轴下注释 x 应≈log10(marker x)）
            const zi = (gd.data[HL].z || []).findIndex(z => Math.abs(z - a.z) < 1e-6);
            if (zi < 0) return false;
            const mx = xs[zi];
            const expect = LINEAGE_DATA.cost_axis_is_log ? Math.log10(mx) : mx;
            return Math.abs(a.x - expect) < 1e-6;
        }""")
        check(coord_ok, "注释 x 坐标 = 对应高亮点的轴坐标（对数轴下为 log10(成本)，与 marker 重合)")

        print("\n[4] hover-only 临时谱系（无 pin 干净态下隔离验证）")
        # 隔离 hover-only：临时取消该 base 的 pin 并清除 hover，使谱系线归零作为基线；
        # 若仍带 pin，则该谱系本就绘出、hover 不新增点（after==before 恒真），无法暴露 hover-only 失效。
        page.evaluate("(b) => window.aaUnpinBase(b)", pick["base"])
        page.evaluate("() => window.aaClearHover()")
        page.wait_for_timeout(100)
        base0 = page.evaluate("() => window.aaState().lineageLen")
        check(base0 == 0, f"无 pin 无 hover 时谱系线点数 = {base0}（应为 0）")
        ok = page.evaluate("(nm) => window.aaShowLineageForName(nm)", pick["anyName"])
        page.wait_for_timeout(100)
        hovered = page.evaluate("() => window.aaState().lineageLen")
        # hover-only 必须把谱系线从 0 拉出 >0 且覆盖该谱系节点（>= 代数）
        check(ok and hovered > 0 and hovered >= pick["gens"],
              f"hover-only 谱系线点数 {base0} → {hovered}（含 {pick['gens']} 代节点）")
        page.evaluate("() => window.aaClearHover()")
        page.wait_for_timeout(100)
        cleared = page.evaluate("() => window.aaState().lineageLen")
        check(cleared == 0, f"清除 hover 后谱系线点数回到 {cleared}（应为 0）")

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
        page.evaluate("() => window.aaOnUnhover()")
        page.wait_for_timeout(120)
        c3 = page.evaluate("() => window.__llRestyle")
        len3 = page.evaluate("() => window.aaState().lineageLen")
        check(c3 == c2 + 1 and len3 == 0, f"unhover：重画 1 次并清空谱系（restyle={c3}, len={len3}）")
        page.evaluate("() => window.aaOnUnhover()")          # 重复 unhover → 应去重
        page.wait_for_timeout(120)
        c4 = page.evaluate("() => window.__llRestyle")
        check(c4 == c3, f"重复 unhover 被去重（restyle 仍={c4}）")

        # 恢复步骤 [3] 的 pin 状态，供步骤 [5] 验证 unpin 清空
        page.evaluate("(b) => window.aaPinBase(b)", pick["base"])
        page.wait_for_timeout(100)

        print("\n[5] unpin → 清空")
        page.evaluate("() => window.aaClearHover()")
        page.evaluate("(b) => window.aaUnpinBase(b)", pick["base"])
        page.wait_for_timeout(100)
        st2 = page.evaluate("() => window.aaState()")
        check(st2["annCount"] == 0, "注释已清空")
        check(st2["highlightLen"] == 0, "高亮已清空")
        check(len(st2["pinned"]) == 0, "pinned 集合已空")

        print("\n[6] trace 下标回归（HL/LL 在末尾，前沿按钮目标未被波及）")
        reg = page.evaluate("""() => {
            const gd = document.getElementById('frontier3d');
            const n = gd.data.length;
            const HL = LINEAGE_DATA.pinned_highlight_trace_index;
            const LL = LINEAGE_DATA.lineage_line_trace_index;
            const names = gd.data.map(t => t.name);
            // 前沿样式按钮的目标下标（restyle args[1]）应全部 < HL
            let maxBtnTarget = -1;
            (gd.layout.updatemenus || []).forEach(um => (um.buttons||[]).forEach(b => {
                const tgt = b.args && b.args[1]; if (Array.isArray(tgt)) tgt.forEach(i => { if (i > maxBtnTarget) maxBtnTarget = i; });
            }));
            return {n, HL, LL, hlName: names[HL], llName: names[LL], maxBtnTarget};
        }""")
        check(reg["hlName"] == "已固定", f"HL trace[{reg['HL']}] = {reg['hlName']!r}")
        check(reg["llName"] == "谱系连线", f"LL trace[{reg['LL']}] = {reg['llName']!r}")
        check(reg["HL"] == reg["n"] - 2 and reg["LL"] == reg["n"] - 1, "HL/LL 为末尾两个 trace")
        check(reg["maxBtnTarget"] < reg["HL"], f"前沿按钮最大目标下标 {reg['maxBtnTarget']} < HL {reg['HL']}（不波及新 trace）")

        check(not errors, f"无 JS 运行时错误（捕获 {len(errors)} 条）")
        if errors:
            for e in errors[:5]:
                print("    JS error:", e)

        browser.close()

    print("\n" + ("✅ 全部通过" if not fails else f"❌ {len(fails)} 项失败"))
    return 0 if not fails else 1


if __name__ == "__main__":
    raise SystemExit(main())
