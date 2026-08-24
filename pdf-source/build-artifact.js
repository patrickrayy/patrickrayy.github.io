/* ==========================================================================
   build-artifact.js — bundles the whole site into ONE self-contained .html
   --------------------------------------------------------------------------
   Fonts become data: URIs, Three.js is inlined as the UMD build, and the
   ES-module scene is rewritten to use the global THREE. Handy for a preview
   link or for opening the site straight off a USB stick — the GitHub Pages
   version stays the multi-file one.

     node pdf-source/build-artifact.js
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), "utf8");

/* ------------------------------------------------ CSS with inlined fonts */
let css = read("css", "fonts.css") + "\n" + read("css", "style.css");
css = css.replace(/url\("\.\.\/assets\/fonts\/([^"]+)"\)/g, (_, file) => {
  const b64 = fs.readFileSync(path.join(ROOT, "assets", "fonts", file)).toString("base64");
  return `url("data:font/woff2;base64,${b64}")`;
});

/* ------------------------------------------------------- Three.js (UMD) */
const threeUMD = fs.readFileSync(
  path.join(ROOT, "..", "node_modules", "three", "build", "three.min.js"), "utf8"
);

/* ------------------------- RoomEnvironment: ES module -> global THREE */
let room = read("vendor", "jsm", "environments", "RoomEnvironment.js");
const importBlock = room.match(/import\s*\{[\s\S]*?\}\s*from\s*'three';/);
const named = importBlock[0].match(/\{([\s\S]*?)\}/)[1]
  .split(",").map(s => s.trim()).filter(Boolean).join(", ");
room = room.replace(importBlock[0], `const { ${named} } = THREE;`);
room = room.replace(/export\s*\{\s*RoomEnvironment\s*\};?/, "window.RoomEnvironment = RoomEnvironment;");

/* --------------------------------- scene.js: ES module -> classic script */
let scene = read("js", "scene.js")
  .replace(/import\s+\*\s+as\s+THREE\s+from\s+"three";/, "")
  .replace(/import\s*\{\s*RoomEnvironment\s*\}\s*from\s*"three\/addons\/environments\/RoomEnvironment\.js";/, "")
  .replace(/^/, "const RoomEnvironment = window.RoomEnvironment;\n");

/* ------------------------------------------- page body from index.html */
const index = read("index.html");
let body = index.slice(index.indexOf("<body>") + 6, index.indexOf("</body>"));
// drop the external <script src> tags — everything is inlined below
body = body.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "");
// no assets/ folder here, so the PDF buttons scroll rather than offer a download
body = body.replace(/\sdownload(?=[\s>])/g, "");
// the favicon lives in the head of the multi-file build; not needed here

const out = `<title>Patrick Raymond Andreas</title>
<style>
${css}
</style>
${body}
<script>
${threeUMD}
</script>
<script>
(function(){
${room}
})();
</script>
<script>
${read("js", "content.js")
  // the single-file build carries no assets/ folder, so the PDF buttons
  // scroll to the work section instead of pointing at a file that isn't there
  .replace(/cvFile:\s*"[^"]*"/, 'cvFile: "#work"')
  .replace(/portfolioFile:\s*"[^"]*"/, 'portfolioFile: "#work"')}
</script>
<script>
${read("js", "main.js")}
</script>
<script>
(function(){
${scene}
})();
</script>
`;

fs.writeFileSync(path.join(ROOT, "..", "artifact.html"), out, "utf8");
console.log("wrote artifact.html —", (out.length / 1024 / 1024).toFixed(2), "MB");
