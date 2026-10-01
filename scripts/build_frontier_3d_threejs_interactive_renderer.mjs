// 打包 Frontier 3D three.js 交互渲染器。
// 用法：
//   node scripts/build_frontier_3d_threejs_interactive_renderer.mjs          重新生成并写入已提交的 bundle
//   node scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check  只在内存中构建，与已提交 bundle 逐字节比较，不同则 exit 1
import { build } from "esbuild";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const outputBundlePath =
  "src/frontier_3d_interactive_report_assets/frontier_3d_threejs_interactive_renderer_bundle.js";
const bundleFreshnessCheckRequested = process.argv.slice(2).includes("--check");

// 两种模式共用同一份 esbuild 配置与后处理，保证 --check 的比较对象与写盘结果完全一致。
const buildResult = await build({
  entryPoints: [
    "src/frontier_3d_interactive_report_assets/frontier_3d_threejs_interactive_renderer_entrypoint.js",
  ],
  outfile: outputBundlePath,
  bundle: true,
  minify: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  legalComments: "eof",
  write: false,
});
const generatedBundleOutputFile = buildResult.outputFiles.find((outputFile) =>
  outputFile.path.endsWith(outputBundlePath),
);
if (!generatedBundleOutputFile || buildResult.outputFiles.length !== 1) {
  console.error(
    `esbuild 产出与预期不符：期望恰好 1 个 ${outputBundlePath}，实际 ${buildResult.outputFiles
      .map((outputFile) => outputFile.path)
      .join(", ")}`,
  );
  process.exit(1);
}

// three.js shader source strings保留上游缩进；去掉行尾空白，保证版本化 bundle 通过 git diff --check。
const postProcessedBundleText = generatedBundleOutputFile.text
  .replace(/[ \t]+$/gm, "")
  .replace(/^ +\t/gm, "\t");
const postProcessedBundleBytes = Buffer.from(postProcessedBundleText, "utf8");

function sha256HexOfBytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function summarizeFirstBundleDifference(committedBundleBytes, rebuiltBundleBytes) {
  const comparableLength = Math.min(committedBundleBytes.length, rebuiltBundleBytes.length);
  let firstDifferentByteOffset = comparableLength;
  for (let byteOffset = 0; byteOffset < comparableLength; byteOffset += 1) {
    if (committedBundleBytes[byteOffset] !== rebuiltBundleBytes[byteOffset]) {
      firstDifferentByteOffset = byteOffset;
      break;
    }
  }
  const lineNumberOfFirstDifference =
    committedBundleBytes.subarray(0, firstDifferentByteOffset).toString("utf8").split("\n").length;
  const excerptAroundOffset = (bytes) =>
    JSON.stringify(
      bytes
        .subarray(Math.max(0, firstDifferentByteOffset - 60), firstDifferentByteOffset + 60)
        .toString("utf8"),
    );
  return [
    `  已提交 bundle：${committedBundleBytes.length} 字节，sha256 ${sha256HexOfBytes(committedBundleBytes)}`,
    `  重新构建结果：${rebuiltBundleBytes.length} 字节，sha256 ${sha256HexOfBytes(rebuiltBundleBytes)}`,
    `  首个差异：字节偏移 ${firstDifferentByteOffset}（已提交文件第 ${lineNumberOfFirstDifference} 行）`,
    `  已提交片段：${excerptAroundOffset(committedBundleBytes)}`,
    `  重建片段：  ${excerptAroundOffset(rebuiltBundleBytes)}`,
  ].join("\n");
}

if (bundleFreshnessCheckRequested) {
  let committedBundleBytes;
  try {
    committedBundleBytes = await readFile(outputBundlePath);
  } catch (readError) {
    console.error(`--check 失败：无法读取已提交 bundle ${outputBundlePath}（${readError.message}）`);
    process.exit(1);
  }
  if (!committedBundleBytes.equals(postProcessedBundleBytes)) {
    console.error(
      `--check 失败：${outputBundlePath} 与入口源码重新构建的结果不一致。\n` +
        summarizeFirstBundleDifference(committedBundleBytes, postProcessedBundleBytes) +
        "\n请运行 npm run build:frontier-3d-threejs 重新打包并一并提交。",
    );
    process.exit(1);
  }
  console.log(
    `--check 通过：${outputBundlePath} 与重新构建结果逐字节一致（${postProcessedBundleBytes.length} 字节，sha256 ${sha256HexOfBytes(postProcessedBundleBytes)}）`,
  );
} else {
  await writeFile(outputBundlePath, postProcessedBundleBytes);
  console.log(
    `已写入 ${outputBundlePath}（${postProcessedBundleBytes.length} 字节，sha256 ${sha256HexOfBytes(postProcessedBundleBytes)}）`,
  );
}
