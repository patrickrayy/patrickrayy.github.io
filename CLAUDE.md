# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static portfolio & CV website for Patrick Raymond Andreas, built for an Apple Developer Academy Indonesia application. No framework, no build step, no bundler, no npm dependencies for the site itself. It's deployed as-is to GitHub Pages at `https://patrickrayy.github.io/`.

The site deliberately makes zero external network calls — fonts and Three.js are vendored into the repo (not loaded from a CDN) so nothing breaks if a third-party host goes down.

## Running it locally

There is no build step. Serve the directory root with any static file server, e.g.:

```bash
python3 -m http.server 8899
```

Then open `http://localhost:8899/`. There is no lint, test, or type-check tooling in this repo.

## Regenerating the CV/Portfolio PDFs

The two PDFs in `assets/` are rendered from HTML in `pdf-source/` via Playwright, so their look stays consistent with the live site.

```bash
npm install playwright        # one-time
npx playwright install chromium

python3 -m http.server 8899   # terminal 1, from repo root
node pdf-source/build-pdf.js  # terminal 2
```

This overwrites `assets/PatrickRaymondAndreas_CV_Academy.pdf` and `assets/PatrickRaymondAndreas_Portfolio_Academy.pdf`.

- **Portfolio PDF** is generated automatically from `js/content.js` — re-run the script above any time that file changes.
- **CV PDF** is authored directly in `pdf-source/cv.html` (not derived from `content.js`) because its layout must stay within a strict 2-page limit. After editing it, regenerate and check the page count; if it spills to 3 pages, trim text or reduce `font-size` in that file's `<style>` block.

## Architecture

**Content and rendering are split.** `js/content.js` is a single global `CONTENT` object holding every string on the site, each written as a bilingual pair:

```js
title: { en: "Field Operations App for an LPG Distributor", id: "Aplikasi Operasional Lapangan untuk Distributor Elpiji" }
```

`js/main.js` is the only file that reads `CONTENT` and renders it into the DOM (project cards, timeline, skills, hero stats, etc.) — `index.html` itself contains almost no literal copy, just empty containers (`#projectList`, `#timeline`, `#skillsGrid`, ...) and `data-i18n="path.to.key"` attributes that `main.js` resolves via dot-path lookup (`pick()`) into `CONTENT`. When editing visible text, change it in `content.js`, not `index.html` — and always update both `en` and `id` together so the language toggle stays in sync.

Placeholders needing real, reviewer-facing numbers (impact metrics the author must supply) are marked `[TBD: ...]` inside `content.js` — grep for `TBD` before considering content "done".

**i18n mechanism**: current language is read from `localStorage["pra-lang"]` on load (default `en`), toggled by `#langToggle`, and a full `renderAll()` re-render happens on every switch rather than patching individual nodes.

**Motion/reduced-motion mechanism**: an inline `<script>` at the top of `<body>` in `index.html` (kept inline so the PDF single-file build in `pdf-source/build-artifact.js` picks it up too) decides motion on/off *before first paint*, based on `localStorage["pra-motion"]` or else `prefers-reduced-motion`, and sets `data-motion="on"/"off"` on `<html>`. All CSS animations and the 3D loop key off that attribute, not off the media query directly, because the visitor can override the OS setting via the motion toggle button — flipping it dispatches a `motionchange` CustomEvent that `js/scene.js` listens for to start/stop its render loop.

**3D scene** (`js/scene.js`) is loaded as an ES module via the import map in `index.html` (`three` / `three/addons/` → `vendor/`), independent of `main.js`/`content.js`. It degrades safely and independently at three levels: no WebGL → canvas hidden, motion off → renders one static frame and no RAF loop, small viewport → capped pixel ratio and fewer particles. It also pauses via `IntersectionObserver` when the canvas scrolls offscreen and on tab visibility change.

**PDF source** (`pdf-source/`) is a separate, parallel presentation of the same content — `portfolio.html`/`portfolio.css` pull from `content.js`, `cv.html` is standalone, and `build-pdf.js`/`build-artifact.js` drive Playwright to rasterize them. This directory is not part of the deployed site.

## Deployment

Plain GitHub Pages from the `main` branch root — no Actions workflow. The repo must be named `<username>.github.io` for the auto-publish/zero-config behavior the README assumes; if renamed (e.g. a project-page repo), the hardcoded `patrickrayy.github.io` URL in `pdf-source/cv.html` needs updating to match.
