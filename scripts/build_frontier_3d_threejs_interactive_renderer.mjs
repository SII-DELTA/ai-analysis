import { build } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";

const outputBundlePath =
  "src/frontier_3d_interactive_report_assets/frontier_3d_threejs_interactive_renderer_bundle.js";

await build({
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
});

// three.js shader source strings保留上游缩进；去掉行尾空白，保证版本化 bundle 通过 git diff --check。
const generatedBundle = await readFile(outputBundlePath, "utf8");
await writeFile(
  outputBundlePath,
  generatedBundle.replace(/[ \t]+$/gm, "").replace(/^ +\t/gm, "\t"),
  "utf8",
);
