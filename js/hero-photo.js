/* ==========================================================================
   hero-photo.js — the hero stage's portrait
   --------------------------------------------------------------------------
   A photo (background removed) that floats over the grid backdrop the same
   way the old Three.js object did: idle drift, a subtle lean toward the
   pointer, and a gentle scale-down as the page scrolls past it.

   Motion is driven by `data-motion` on <html>, set before first paint by the
   inline script in index.html and flipped by the control in the stage
   corner — this file only reacts to it, it never reads prefers-reduced-motion
   directly (see CLAUDE.md's motion section for why).
   ========================================================================== */

const img   = document.getElementById("scene");
const stage = img ? img.parentElement : null;
if (img && stage) boot();

function boot() {
  const motionOn = () => document.documentElement.getAttribute("data-motion") === "on";

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("pointermove", (e) => {
    if (!motionOn()) return;
    pointer.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
    pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  let scrollN = 0;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollN = max > 0 ? window.scrollY / max : 0;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------- pause when hidden */
  let visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 }
    ).observe(stage);
  }
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && motionOn()) tick();
  });

  /* -------------------------------------------------------------- loop */
  const clock = { start: performance.now(), last: performance.now() };
  let raf = 0;

  function frame() {
    const now = performance.now();
    const dt  = Math.min((now - clock.last) / 1000, 0.05);
    const t   = (now - clock.start) / 1000;
    clock.last = now;

    pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3.2);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3.2);

    const rot   = pointer.x * -2.2;
    const tiltY = pointer.y * -6;
    const bob   = Math.sin(t * 0.6) * 5;
    const scale = 1 - scrollN * 0.08;

    img.style.transform =
      `translate3d(${(pointer.x * 10).toFixed(2)}px, ${(bob + tiltY).toFixed(2)}px, 0) ` +
      `rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

    raf = requestAnimationFrame(frame);
  }

  function tick() {
    cancelAnimationFrame(raf);
    if (!motionOn()) return;                 // switched off mid-flight: stop
    if (!visible || document.hidden) { raf = requestAnimationFrame(tick); return; }
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
    pointer.tx = pointer.ty = 0;
    pointer.x  = pointer.y  = 0;
    frameStatic();
  }

  /** The pose the stage shows while motion is off. */
  function frameStatic() {
    img.style.transform = "none";
  }

  function start() {
    clock.start = clock.last = performance.now();
    tick();
  }

  window.addEventListener("motionchange", (e) => {
    if (e.detail && e.detail.on) start(); else stop();
  });

  if (motionOn()) start(); else frameStatic();
}
