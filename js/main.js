/* ==========================================================================
   main.js — rendering, bilingual switching, interactions
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------ language */
  var LANGS = ["en", "id"];
  var lang = "en";
  try {
    var saved = localStorage.getItem("pra-lang");
    if (LANGS.indexOf(saved) !== -1) lang = saved;
  } catch (e) { /* private mode */ }

  /** Resolve a { en, id } object — or return the plain value untouched. */
  function t(v) {
    if (v && typeof v === "object" && !Array.isArray(v) && (("en" in v) || ("id" in v))) {
      return v[lang] != null ? v[lang] : v.en;
    }
    return v;
  }

  /** Read "ui.nav.about" out of CONTENT. */
  function pick(path) {
    return path.split(".").reduce(function (acc, key) {
      return (acc == null) ? acc : acc[key];
    }, CONTENT);
  }

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* -------------------------------------------------------------- icons */
  var ICONS = {
    github: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.7.5.6 5.6.6 11.9c0 5 3.3 9.3 7.8 10.8.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6a11.4 11.4 0 0 0 7.8-10.8C23.4 5.6 18.3.5 12 .5z"/></svg>',
    linkedin: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.95-1.8-2.95s-2.08 1.4-2.08 2.85V21h-4z"/></svg>',
    instagram: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none"/></svg>',
    mail: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>',
    plus: '<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M6.5 0v13M0 6.5h13" stroke="currentColor" stroke-width="1.6"/></svg>',
    arrow: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 11 11 1M3.5 1H11v7.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>'
  };

  /* ================================================================ RENDER */

  function renderStaticText() {
    $$("[data-i18n]").forEach(function (node) {
      var val = t(pick(node.getAttribute("data-i18n")));
      if (typeof val === "string") node.textContent = val;
    });
    document.documentElement.lang = lang;
    renderMotionButton();
    $("#langLabel").textContent = t(CONTENT.ui.labels.langSwitch);
    $("#langShort").textContent = (lang === "en") ? "ID" : "EN";
    $("#langToggle").setAttribute("aria-label",
      lang === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English");
    document.title = CONTENT.meta.name + " — Portfolio & CV";
  }

  function renderChrome() {
    var m = CONTENT.meta;
    $("#brandMark").textContent = m.initials;
    $("#brandName").textContent = m.shortName;
    $("#cvTop").href = m.cvFile;
    $("#cvDrawer").href = m.cvFile;
    $("#pfBtn").href = m.portfolioFile;

    var rail = $("#rail");
    rail.innerHTML = "";
    [
      { key: "github",    url: m.links.github,    label: "GitHub" },
      { key: "linkedin",  url: m.links.linkedin,  label: "LinkedIn" },
      { key: "instagram", url: m.links.instagram, label: "Instagram" },
      { key: "mail",      url: "mailto:" + m.email, label: "Email" }
    ].forEach(function (s) {
      var a = el("a");
      a.href = s.url;
      a.setAttribute("aria-label", s.label);
      if (s.key !== "mail") { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      a.innerHTML = ICONS[s.key];
      rail.appendChild(a);
    });

    $("#footerName").textContent = "© " + new Date().getFullYear() + " " + m.name;
    $("#footerYear").textContent = t(CONTENT.ui.footer.rights);
  }

  function renderHero() {
    // Oversized marquee — the name, repeated
    var track = $("#heroTrack");
    track.innerHTML = "";
    for (var i = 0; i < 2; i++) {
      var span = el("span");
      span.innerHTML = (CONTENT.meta.name + " <i>&#9632;</i> ").repeat(2);
      track.appendChild(span);
    }

    var stats = $("#heroStats");
    stats.innerHTML = "";
    CONTENT.hero.stats.forEach(function (s) {
      var box = el("div", "stat");
      box.appendChild(el("span", "stat__value", s.value));
      box.appendChild(el("span", "stat__label", t(s.label)));
      stats.appendChild(box);
    });

    var tick = $("#tickerTrack");
    tick.innerHTML = "";
    for (var r = 0; r < 3; r++) {
      CONTENT.hero.ticker.forEach(function (item) {
        tick.appendChild(el("span", null, item));
      });
    }
  }

  function renderAbout() {
    var wrap = $("#aboutGrid");
    wrap.innerHTML = "";
    CONTENT.about.cards.forEach(function (c) {
      var card = el("article", "card");
      card.appendChild(el("span", "card__num", c.num));
      card.appendChild(el("h3", "card__title", t(c.title)));
      card.appendChild(el("p", "card__body", t(c.body)));
      wrap.appendChild(card);
    });
  }

  function field(label, value, isHtml) {
    var f = el("div", "field");
    f.appendChild(el("span", "field__label", label));
    var v = el("p", "field__value");
    if (isHtml) { v.innerHTML = value; } else { v.textContent = value; }
    f.appendChild(v);
    return f;
  }

  function renderProjects() {
    var list = $("#projectList");
    var L = CONTENT.ui.labels;
    var openIds = $$(".project.is-open", list).map(function (n) { return n.dataset.id; });
    list.innerHTML = "";

    CONTENT.projects.forEach(function (p) {
      var art = el("article", "project");
      art.dataset.id = p.id;

      /* ---- header (clickable) ---- */
      var head = el("button", "project__head");
      head.type = "button";
      head.setAttribute("aria-expanded", "false");
      head.setAttribute("aria-controls", "panel-" + p.id);

      head.appendChild(el("span", "project__index", p.index));

      var titles = el("div", "project__titles");
      titles.appendChild(el("h3", "project__title", t(p.title)));
      var sub = el("div", "project__sub");
      sub.appendChild(el("span", "tag tag--pill" + (p.isGroup ? " tag--group" : ""),
        p.isGroup ? t(L.group) : t(L.individual)));
      sub.appendChild(el("span", "tag", t(p.tagline)));
      sub.appendChild(el("span", "tag", p.year));
      titles.appendChild(sub);
      head.appendChild(titles);

      var toggle = el("span", "project__toggle");
      toggle.innerHTML = ICONS.plus;
      head.appendChild(toggle);
      art.appendChild(head);

      /* ---- panel ---- */
      var panel = el("div", "project__panel");
      panel.id = "panel-" + p.id;
      var inner = el("div");
      var content = el("div", "project__content");

      var left = el("div");
      left.appendChild(field(lang === "id" ? "Ringkasan" : "Summary", t(p.summary)));
      left.appendChild(field(t(L.type),    t(p.initiation)));
      left.appendChild(field(t(L.role),    t(p.role)));
      left.appendChild(field(t(L.impact),  t(p.impact)));
      left.appendChild(field(t(L.learned), t(p.learned)));
      content.appendChild(left);

      var right = el("div");

      // stack
      var sf = el("div", "field");
      sf.appendChild(el("span", "field__label", t(L.stackLabel)));
      var chips = el("div", "chips");
      p.stack.forEach(function (s) { chips.appendChild(el("span", "chip", s)); });
      sf.appendChild(chips);
      right.appendChild(sf);

      // gallery
      var gf = el("div", "field");
      gf.appendChild(el("span", "field__label", t(L.gallery)));
      if (p.images && p.images.length) {
        var grid = el("div", "media__grid");
        p.images.forEach(function (img) {
          var fig = el("figure");
          var im = el("img");
          im.src = img.src;
          im.alt = img.caption ? t(img.caption) : t(p.title);
          im.loading = "lazy";
          fig.appendChild(im);
          if (img.caption) fig.appendChild(el("figcaption", null, t(img.caption)));
          grid.appendChild(fig);
        });
        gf.appendChild(grid);
      } else {
        var ph = el("div", "placeholder");
        ph.appendChild(el("span", "mk mk--hollow"));
        ph.appendChild(el("span", "mono", t(L.addImage)));
        gf.appendChild(ph);
      }
      right.appendChild(gf);

      // links
      var lf = el("div", "field");
      lf.appendChild(el("span", "field__label", t(L.links)));
      if (p.links && p.links.length) {
        var ll = el("div", "linklist");
        p.links.forEach(function (lk) {
          var a = el("a");
          a.href = lk.url; a.target = "_blank"; a.rel = "noopener noreferrer";
          a.appendChild(el("span", null, lk.label));
          var ic = el("span"); ic.innerHTML = ICONS.arrow; a.appendChild(ic);
          ll.appendChild(a);
        });
        lf.appendChild(ll);
      } else {
        var ph2 = el("div", "placeholder placeholder--link");
        ph2.appendChild(el("span", "mono", t(L.addLink)));
        lf.appendChild(ph2);
      }
      right.appendChild(lf);

      content.appendChild(right);
      inner.appendChild(content);
      panel.appendChild(inner);
      art.appendChild(panel);

      head.addEventListener("click", function () {
        var open = art.classList.toggle("is-open");
        head.setAttribute("aria-expanded", open ? "true" : "false");
      });

      if (openIds.indexOf(p.id) !== -1) {
        art.classList.add("is-open");
        head.setAttribute("aria-expanded", "true");
      }

      list.appendChild(art);
    });
  }

  function renderExperience() {
    var wrap = $("#timeline");
    wrap.innerHTML = "";
    CONTENT.experience.forEach(function (j) {
      var row = el("article", "job");
      row.appendChild(el("div", "job__period", t(j.period)));

      var mid = el("div");
      mid.appendChild(el("h3", "job__role", t(j.role)));
      mid.appendChild(el("div", "job__org", j.org));
      row.appendChild(mid);

      var ul = el("ul", "job__points");
      t(j.points).forEach(function (p) { ul.appendChild(el("li", null, p)); });
      row.appendChild(ul);

      wrap.appendChild(row);
    });
  }

  function renderSkills() {
    var grid = $("#skillsGrid");
    grid.innerHTML = "";
    CONTENT.skills.forEach(function (g) {
      var box = el("div", "skillgroup");
      box.appendChild(el("h3", null, t(g.group)));
      var chips = el("div", "chips");
      g.items.forEach(function (i) { chips.appendChild(el("span", "chip", i)); });
      box.appendChild(chips);
      grid.appendChild(box);
    });

    var side = $("#sidePanels");
    side.innerHTML = "";

    // Education
    var edu = el("div", "panel");
    edu.appendChild(el("h3", null, lang === "id" ? "Pendidikan" : "Education"));
    edu.appendChild(el("div", "panel__title", t(CONTENT.education.degree)));
    edu.appendChild(el("div", "panel__meta", CONTENT.education.school));
    var r1 = el("div", "panel__row");
    r1.appendChild(el("span", "mono dim", t(CONTENT.education.period)));
    r1.appendChild(el("span", "mono", CONTENT.education.gpa));
    edu.appendChild(r1);
    edu.appendChild(el("p", "card__body", t(CONTENT.education.thesis)));
    side.appendChild(edu);

    // Awards
    var aw = el("div", "panel");
    aw.appendChild(el("h3", null, lang === "id" ? "Penghargaan" : "Awards"));
    CONTENT.awards.forEach(function (a) {
      aw.appendChild(el("div", "panel__title", t(a.title)));
      aw.appendChild(el("div", "panel__meta", t(a.org) + " · " + a.year));
    });
    side.appendChild(aw);
  }

  function renderContact() {
    var m = CONTENT.meta;
    var big = $("#contactEmail");
    big.href = "mailto:" + m.email;
    big.textContent = m.email;

    var list = $("#contactList");
    list.innerHTML = "";
    function row(label, value, href, external) {
      var node = href ? el("a") : el("div");
      if (href) {
        node.href = href;
        if (external) { node.target = "_blank"; node.rel = "noopener noreferrer"; }
      }
      node.appendChild(el("span", null, label));
      node.appendChild(el("span", null, value));
      list.appendChild(node);
    }
    row(lang === "id" ? "Telepon"  : "Phone",    m.phone, "tel:" + m.phoneHref, false);
    row(lang === "id" ? "Domisili" : "Based in", t(m.location), null, false);
    row("GitHub",    "github.com/patrickrayy",  m.links.github,    true);
    row("LinkedIn",  "in/patrick-raymond",      m.links.linkedin,  true);
    row("Instagram", "@patrickrayy_",           m.links.instagram, true);
  }

  function renderAll() {
    renderStaticText();
    renderChrome();
    renderHero();
    renderAbout();
    renderProjects();
    renderExperience();
    renderSkills();
    renderContact();
  }

  /* ========================================================== INTERACTIONS */

  /* ------------------------------------------------------------- motion */
  function motionOn() {
    return document.documentElement.getAttribute("data-motion") === "on";
  }

  function renderMotionButton() {
    var btn = $("#motionToggle");
    if (!btn) return;
    var on = motionOn();
    var L = CONTENT.ui.labels;
    $("#motionLabel").textContent = on ? t(L.motionOn) : t(L.motionOff);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("title", on ? t(L.motionHintOn) : t(L.motionHintOff));
    btn.setAttribute("aria-label", on ? t(L.motionHintOn) : t(L.motionHintOff));
  }

  function initMotion() {
    var btn = $("#motionToggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = motionOn() ? "off" : "on";
      document.documentElement.setAttribute("data-motion", next);
      try { localStorage.setItem("pra-motion", next); } catch (e) {}
      renderMotionButton();
      // scene.js listens for this to start or stop its render loop
      window.dispatchEvent(new CustomEvent("motionchange", { detail: { on: next === "on" } }));
    });
  }

  function initLang() {
    $("#langToggle").addEventListener("click", function () {
      lang = (lang === "en") ? "id" : "en";
      try { localStorage.setItem("pra-lang", lang); } catch (e) {}
      renderAll();
    });
  }

  function initMenu() {
    var burger = $("#burger");
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      document.body.classList.toggle("is-locked", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#drawer a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("menu-open", "is-locked");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .06 });
    $$(".reveal").forEach(function (n) { io.observe(n); });
  }

  function initScrollSpy() {
    var links = $$(".nav a");
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------------------------------------------------------------- boot */
  renderAll();
  initMotion();
  initLang();
  initMenu();
  initReveal();
  initScrollSpy();
})();
