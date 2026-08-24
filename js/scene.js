/* ==========================================================================
   scene.js — the 3D hero object (Three.js)
   --------------------------------------------------------------------------
   A soft-plastic "jack": six rounded arms on the three axes around a core,
   one of them accent-orange. Idles on its own, leans toward the pointer,
   and rotates as the page scrolls.

   Degrades safely:
   - no WebGL      -> canvas is hidden, layout is untouched
   - motion off    -> one static frame, no loop (see below)
   - small screens -> capped pixel ratio, fewer particles

   Motion is driven by `data-motion` on <html>, set before first paint by the
   inline script in index.html and flipped by the control in the stage corner.
   It starts "off" when the OS asks for reduced motion, but the visitor can
   always turn it on — which is why this file watches an event rather than
   reading prefers-reduced-motion once and freezing forever.
   ========================================================================== */

import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const canvas = document.getElementById("scene");
const stage  = canvas ? canvas.parentElement : null;
if (canvas && stage) boot();

function boot() {
  const motionOn = () => document.documentElement.getAttribute("data-motion") === "on";
  const small    = window.matchMedia("(max-width: 700px)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !small,
      alpha: true,
      powerPreference: "high-performance"
    });
  } catch (err) {
    canvas.style.display = "none";
    return;                       // no WebGL — the page still reads fine
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 9.2);

  /* ------------------------------------------------------- environment */
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));

  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(4, 6, 5);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xffd9c2, 1.1);
  rim.position.set(-5, -2, -4);
  scene.add(rim);

  /* ----------------------------------------------------------- the jack */
  const shell = new THREE.MeshPhysicalMaterial({
    color: 0xf7f7f5,
    roughness: 0.34,
    metalness: 0.0,
    clearcoat: 0.7,
    clearcoatRoughness: 0.22,
    envMapIntensity: 1.0
  });

  const accent = new THREE.MeshPhysicalMaterial({
    color: 0xff5a00,
    roughness: 0.3,
    metalness: 0.05,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    emissive: 0xff3b00,
    emissiveIntensity: 0.18,
    envMapIntensity: 0.9
  });

  const dark = new THREE.MeshPhysicalMaterial({
    color: 0x1a1a18,
    roughness: 0.42,
    metalness: 0.1,
    clearcoat: 0.5
  });

  const object = new THREE.Group();

  // Core
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.92, 4), shell);
  object.add(core);

  // Six arms: +X, -X, +Y, -Y, +Z, -Z  (the +X arm is the accent one)
  const armGeo = new THREE.CapsuleGeometry(0.42, 1.35, 8, 24);
  const AXES = [
    { dir: [ 1, 0, 0], rot: [0, 0, -Math.PI / 2], mat: accent },
    { dir: [-1, 0, 0], rot: [0, 0,  Math.PI / 2], mat: shell  },
    { dir: [ 0, 1, 0], rot: [0, 0, 0],            mat: shell  },
    { dir: [ 0,-1, 0], rot: [Math.PI, 0, 0],      mat: shell  },
    { dir: [ 0, 0, 1], rot: [ Math.PI / 2, 0, 0], mat: shell  },
    { dir: [ 0, 0,-1], rot: [-Math.PI / 2, 0, 0], mat: shell  }
  ];

  AXES.forEach(({ dir, rot, mat }) => {
    const arm = new THREE.Mesh(armGeo, mat);
    arm.position.set(dir[0] * 1.18, dir[1] * 1.18, dir[2] * 1.18);
    arm.rotation.set(rot[0], rot[1], rot[2]);
    object.add(arm);

    // small collar where each arm meets the core
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.47, 0.055, 10, 32), dark);
    collar.position.set(dir[0] * 0.78, dir[1] * 0.78, dir[2] * 0.78);
    collar.rotation.set(rot[0], rot[1], rot[2]);
    collar.rotateX(Math.PI / 2);
    object.add(collar);
  });

  // Thin orbiting ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.62, 0.022, 8, 160), dark);
  ring.rotation.set(Math.PI / 2.35, 0.2, 0);
  object.add(ring);

  object.rotation.set(0.42, -0.62, 0.12);
  scene.add(object);

  /* -------------------------------------------------------- dust motes */
  const MOTES = small ? 90 : 220;
  const pos = new Float32Array(MOTES * 3);
  for (let i = 0; i < MOTES; i++) {
    const r = 4.2 + Math.random() * 4.4;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.62;
    pos[i * 3 + 2] = r * Math.cos(ph);
  }
  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const motes = new THREE.Points(
    moteGeo,
    new THREE.PointsMaterial({ color: 0x11110f, size: 0.038, transparent: true, opacity: 0.34, sizeAttenuation: true })
  );
  scene.add(motes);

  /* ------------------------------------------------------------ resize */
  function resize() {
    const w = stage.clientWidth  || 1;
    const h = stage.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // pull the camera back a little on narrow stages so nothing clips
    camera.position.z = camera.aspect < 0.95 ? 11.4 : 9.2;
    camera.updateProjectionMatrix();
  }
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(stage);
  else window.addEventListener("resize", resize);

  /* ----------------------------------------------------------- pointer */
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
  const clock = new THREE.Clock();
  let raf = 0;

  function frame() {
    // getDelta() FIRST: getElapsedTime() consumes the delta internally, so
    // calling it first leaves dt at ~0 and the pointer easing never moves.
    const dt = Math.min(clock.getDelta(), 0.05);
    const t  = clock.elapsedTime;

    pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3.2);
    pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3.2);

    object.rotation.y = -0.62 + t * 0.22 + scrollN * Math.PI * 1.6 + pointer.x * 0.42;
    object.rotation.x = 0.42 + Math.sin(t * 0.42) * 0.1 + pointer.y * -0.3;
    object.position.y = Math.sin(t * 0.75) * 0.14;

    const s = 1 - scrollN * 0.16;
    object.scale.setScalar(s);

    motes.rotation.y = t * 0.045;
    motes.rotation.x = pointer.y * 0.06;

    renderer.render(scene, camera);
  }

  function tick() {
    cancelAnimationFrame(raf);
    if (!motionOn()) return;                 // switched off mid-flight: stop
    raf = requestAnimationFrame(tick);
    if (!visible || document.hidden) return;
    frame();
  }

  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
    pointer.tx = pointer.ty = 0;
    pointer.x  = pointer.y  = 0;
    frameStatic();
  }

  /** One well-composed frame — what the stage shows while motion is off. */
  function frameStatic() {
    object.rotation.set(0.42, -0.62, 0.12);
    object.position.y = 0;
    object.scale.setScalar(1);
    renderer.render(scene, camera);
  }

  function start() {
    clock.getDelta();                        // drop the idle time, avoid a jump
    tick();
  }

  window.addEventListener("motionchange", (e) => {
    if (e.detail && e.detail.on) start(); else stop();
  });

  // keep the static pose current when the stage is resized with motion off
  window.addEventListener("resize", () => { if (!motionOn()) frameStatic(); });
  if ("ResizeObserver" in window) {
    new ResizeObserver(() => { if (!motionOn()) frameStatic(); }).observe(stage);
  }

  if (motionOn()) start(); else frameStatic();
}
