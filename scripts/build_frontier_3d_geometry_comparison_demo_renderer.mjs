import { build } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const repositoryDirectory = fileURLToPath(new URL("../", import.meta.url));
const bundlePath = "src/frontier_3d_geometry_comparison_assets/frontier_3d_geometry_comparison_renderer_bundle.js";
const result = await build({
  absWorkingDir: repositoryDirectory,
  entryPoints: ["src/frontier_3d_geometry_comparison_assets/frontier_3d_geometry_comparison_renderer_entrypoint.js"],
  outfile: bundlePath,
  bundle: true, minify: true, format: "iife", platform: "browser", target: ["es2020"],
  legalComments: "eof", write: false,
});
const generated = result.outputFiles[0].text.replace(/[ \t]+$/gm, "").replace(/^ +\t/gm, "\t");
const absoluteBundlePath = new URL(`../${bundlePath}`, import.meta.url);
if (process.argv.includes("--check")) {
  if (await readFile(absoluteBundlePath, "utf8") !== generated) {
    throw new Error("独立比较页 bundle 与源码不一致，请先重建");
  }
  console.log("独立比较页 bundle 逐字节检查通过");
} else {
  await writeFile(absoluteBundlePath, generated);
  console.log(`已生成独立比较页 bundle：${bundlePath}`);
}
