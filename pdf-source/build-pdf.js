/* ==========================================================================
   build-pdf.js — regenerates both submission PDFs from js/content.js
   --------------------------------------------------------------------------
   Usage (from the repo root):
     1)  python3 -m http.server 8899
     2)  node pdf-source/build-pdf.js
   Output lands in assets/ with the file names the Academy asks for.
   ========================================================================== */

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { chromium } = require("playwright");

const ROOT   = path.resolve(__dirname, "..");
const ORIGIN = process.env.ORIGIN || "http://localhost:8899";
const FULLNAME_SLUG = "PatrickRaymondAndreas";

/* --------------------------------------------- load content.js as data */
const sandbox = {};
vm.createContext(sandbox);
const src = fs.readFileSync(path.join(ROOT, "js", "content.js"), "utf8");
// `const CONTENT` is a lexical binding — hand it to the sandbox explicitly.
vm.runInContext(src + "\n;globalThis.__CONTENT__ = CONTENT;", sandbox);
const C = sandbox.__CONTENT__;

const en = (v) => (v && typeof v === "object" && "en" in v) ? v.en : v;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ------------------------------------------ generate the portfolio HTML */
function projectPage(p) {
  const roleTag = p.isGroup ? `<span class="pill pill--group">Group project</span>`
                            : `<span class="pill pill--solo">Individual project</span>`;

  const gallery = (p.images && p.images.length)
    ? `<div class="shots">${p.images.map(img =>
        `<figure><img src="../${esc(img.src)}" alt=""><figcaption>${esc(en(img.caption) || "")}</figcaption></figure>`
      ).join("")}</div>`
    : `<div class="shots">
         <div class="slot"><span class="mono">Image slot</span><span class="mono dim">add to content.js</span></div>
         <div class="slot"><span class="mono">Image slot</span><span class="mono dim">add to content.js</span></div>
       </div>`;

  const links = (p.links && p.links.length)
    ? `<ul class="links">${p.links.map(l =>
        `<li><span class="mono">${esc(l.label)}</span><span class="url">${esc(l.url)}</span></li>`
      ).join("")}</ul>`
    : `<div class="slot slot--thin"><span class="mono dim">Link slot — add a URL in content.js</span></div>`;

  return `
<section class="page proj">
  <header class="proj__top">
    <div class="proj__num">${esc(p.index)}</div>
    <div>
      <h2 class="proj__title">${esc(en(p.title))}</h2>
      <div class="proj__tags">
        ${roleTag}
        <span class="pill">${esc(en(p.tagline))}</span>
        <span class="pill">${esc(p.year)}</span>
      </div>
    </div>
  </header>

  <p class="proj__summary">${esc(en(p.summary))}</p>

  <div class="proj__body">
    <div class="col">
      <div class="f"><span class="f__k">How it started</span><p>${esc(en(p.initiation))}</p></div>
      <div class="f"><span class="f__k">My role</span><p>${esc(en(p.role))}</p></div>
      <div class="f"><span class="f__k">Impact</span><p>${esc(en(p.impact))}</p></div>
      <div class="f"><span class="f__k">What I learned</span><p>${esc(en(p.learned))}</p></div>
    </div>
    <div class="col">
      <div class="f">
        <span class="f__k">Stack &amp; tools</span>
        <div class="chips">${p.stack.map(s => `<span class="chip">${esc(s)}</span>`).join("")}</div>
      </div>
      <div class="f f--grow"><span class="f__k">Gallery</span>${gallery}</div>
      <div class="f"><span class="f__k">Links</span>${links}</div>
    </div>
  </div>

  <footer class="pfoot">
    <span class="mono">${esc(C.meta.name)} — Portfolio</span>
    <span class="mono">${esc(p.index)} / 0${C.projects.length}</span>
  </footer>
</section>`;
}

function portfolioHTML() {
  const toc = C.projects.map(p => `
    <li>
      <span class="toc__n">${esc(p.index)}</span>
      <span class="toc__t">${esc(en(p.title))}</span>
      <span class="toc__m">${p.isGroup ? "Group" : "Individual"} · ${esc(p.year)}</span>
    </li>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(C.meta.name)} — Portfolio</title>
<link rel="stylesheet" href="print.css">
<link rel="stylesheet" href="portfolio.css">
</head>
<body>

<section class="page cover">
  <div class="cover__top">
    <span class="mark">${esc(C.meta.initials)}</span>
    <span class="mono">Apple Developer Academy Indonesia — Application</span>
  </div>

  <div class="cover__mid">
    <h1 class="cover__word">Portfolio</h1>
    <div class="cover__rule"></div>
    <h2 class="cover__name">${esc(C.meta.name)}</h2>
    <p class="cover__role mono">${esc(en(C.meta.role))}</p>
    <p class="cover__lead">${esc(en(C.hero.lead))}</p>
  </div>

  <div class="cover__toc">
    <span class="mono accent">Contents</span>
    <ul class="toc">${toc}</ul>
  </div>

  <div class="cover__foot">
    <span class="mono">${esc(C.meta.email)}</span>
    <span class="mono">${esc(C.meta.phone)}</span>
    <span class="mono">${esc(C.meta.links.github.replace(/^https?:\/\//, ""))}</span>
    <span class="mono">${esc(en(C.meta.location))}</span>
  </div>
</section>

${C.projects.map(projectPage).join("\n")}

</body>
</html>`;
}

/* ------------------------------------------------------------------ run */
(async () => {
  fs.writeFileSync(path.join(__dirname, "portfolio.html"), portfolioHTML(), "utf8");

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();

  const jobs = [
    { url: `${ORIGIN}/pdf-source/cv.html`,        out: `${FULLNAME_SLUG}_CV_Academy.pdf`,        margin: null },
    { url: `${ORIGIN}/pdf-source/portfolio.html`, out: `${FULLNAME_SLUG}_Portfolio_Academy.pdf`, margin: { top: "0", right: "0", bottom: "0", left: "0" } }
  ];

  for (const job of jobs) {
    await page.goto(job.url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    const opts = { path: path.join(ROOT, "assets", job.out), format: "A4", printBackground: true };
    if (job.margin) opts.margin = job.margin;
    await page.pdf(opts);
    console.log("wrote assets/" + job.out);
  }

  await browser.close();
})();
