/* ==========================================================================
   build-artifact.js — bundles the whole site into ONE self-contained .html
   --------------------------------------------------------------------------
   Fonts and the hero portrait become data: URIs. Handy for a preview link or
   for opening the site straight off a USB stick — the GitHub Pages version
   stays the multi-file one.

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

/* --------------------------------------------- hero portrait, as a data URI */
const portraitB64 = fs.readFileSync(path.join(ROOT, "assets", "portrait.png")).toString("base64");
const portraitDataURI = `data:image/png;base64,${portraitB64}`;

/* ------------------------------------------- page body from index.html */
const index = read("index.html");
let body = index.slice(index.indexOf("<body>") + 6, index.indexOf("</body>"));
// drop the external <script src> tags — everything is inlined below
body = body.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "");
// no assets/ folder here, so the PDF buttons scroll rather than offer a download
body = body.replace(/\sdownload(?=[\s>])/g, "");
// inline the portrait so the single-file build carries no assets/ folder
body = body.replace('src="assets/portrait.png"', `src="${portraitDataURI}"`);
// the favicon lives in the head of the multi-file build; not needed here

const out = `<title>Patrick Raymond Andreas</title>
<style>
${css}
</style>
${body}
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
${read("js", "hero-photo.js")}
</script>
`;

fs.writeFileSync(path.join(ROOT, "..", "artifact.html"), out, "utf8");
console.log("wrote artifact.html —", (out.length / 1024 / 1024).toFixed(2), "MB");
