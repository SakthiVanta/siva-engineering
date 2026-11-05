import {
  ACESFilmicToneMapping,
  AmbientLight,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Path,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  Shape,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type PlaygroundParams = {
  mode: "single" | "pair";
  z1: number; // teeth, gear 1
  z2: number; // teeth, gear 2 (pair mode)
  m: number; // module (mm)
  face: number; // face width (mm)
  bore: number; // bore diameter (mm)
  keyway: boolean;
  spin: boolean;
};

type Theme = "light" | "dark";
const COLORS = { light: 0x5d5d64, dark: 0xcfcfd6 } as const;

/** Standard 20° full-depth spur gear outline (trapezoid approximation) with bore, keyway and optional lightening holes. */
function outline(z: number, m: number, bore: number, keyway: boolean) {
  const pitchR = (z * m) / 2;
  const outer = pitchR + m;
  const root = Math.max(pitchR - 1.25 * m, m);
  const step = (Math.PI * 2) / z;
  const s = new Shape();
  for (let i = 0; i < z; i++) {
    const a = i * step;
    (
      [
        [root, 0.04],
        [pitchR, 0.2],
        [outer, 0.34],
        [outer, 0.66],
        [pitchR, 0.8],
        [root, 0.96],
      ] as [number, number][]
    ).forEach(([r, f], j) => {
      const x = r * Math.cos(a + step * f);
      const y = r * Math.sin(a + step * f);
      if (i === 0 && j === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    });
  }
  s.closePath();

  const br = Math.min(bore / 2, root * 0.6);
  const hole = new Path();
  if (keyway && br > m) {
    const kw = Math.max(br * 0.28, 0.4);
    const kd = br * 0.34;
    const ka = Math.asin(Math.min(kw / br, 0.95));
    hole.moveTo(br * Math.sin(ka), br * Math.cos(ka));
    hole.lineTo(kw, br + kd);
    hole.lineTo(-kw, br + kd);
    hole.lineTo(-br * Math.sin(ka), br * Math.cos(ka));
    hole.absarc(0, 0, br, Math.PI / 2 + ka, Math.PI / 2 - ka + Math.PI * 2, false);
  } else {
    hole.absarc(0, 0, br, 0, Math.PI * 2, true);
  }
  s.holes.push(hole);

  // lightening holes on larger gears
  if (root - br > 4 * m && root > 14 * m * 0.5) {
    const n = 6;
    const at = (root + br) / 2;
    const r = (root - br) * 0.22;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + Math.PI / n;
      const h = new Path();
      h.absarc(Math.cos(ang) * at, Math.sin(ang) * at, r, 0, Math.PI * 2, true);
      s.holes.push(h);
    }
  }
  return { shape: s, pitchR, outer };
}

export type Playground = { update: (p: PlaygroundParams) => void; setTheme: (t: Theme) => void; dispose: () => void };

export function createPlayground(container: HTMLElement, canvas: HTMLCanvasElement, initial: PlaygroundParams, initialTheme: Theme): Playground {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
  const renderer = new WebGLRenderer({ canvas, antialias: dpr < 2, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  pmrem.dispose();
  const key = new DirectionalLight(0xffffff, 1.5);
  key.position.set(-4, 5, 6);
  scene.add(key, new AmbientLight(0xffffff, 0.25));

  let theme: Theme = initialTheme;
  const mat = new MeshStandardMaterial({ color: COLORS[theme], metalness: theme === "dark" ? 0.7 : 0.55, roughness: 0.34, envMapIntensity: theme === "dark" ? 1.2 : 1.45 });

  const world = new Group(); // user rotation
  const holder = new Group(); // centring + fit scale
  world.add(holder);
  scene.add(world);
  world.rotation.set(0.35, -0.5, 0);

  const camera = new PerspectiveCamera(30, 1, 0.1, 500);
  camera.position.set(0, 0, 14);

  let params = initial;
  let meshes: Mesh[] = [];
  let z1 = 0;
  let z2 = 0;
  let halfW = 5;
  let halfH = 5;

  const clear = () => {
    meshes.forEach((m) => {
      holder.remove(m);
      m.geometry.dispose();
    });
    meshes = [];
  };

  const rebuild = () => {
    clear();
    const p = params;
    const a = outline(p.z1, p.m, p.bore, p.keyway);
    const geo1 = new ExtrudeGeometry(a.shape, { depth: p.face, bevelEnabled: true, bevelThickness: Math.min(p.m * 0.1, 0.6), bevelSize: Math.min(p.m * 0.08, 0.5), bevelSegments: 1, curveSegments: coarse ? 10 : 18 });
    geo1.translate(0, 0, -p.face / 2);
    const g1 = new Mesh(geo1, mat);
    meshes.push(g1);
    holder.add(g1);
    let extentX = a.outer;
    let minX = -a.outer;
    let maxX = a.outer;
    let extentY = a.outer;

    if (p.mode === "pair") {
      const b = outline(p.z2, p.m, Math.max(p.bore * 0.6, p.m * 2), p.keyway);
      const geo2 = new ExtrudeGeometry(b.shape, { depth: p.face, bevelEnabled: true, bevelThickness: Math.min(p.m * 0.1, 0.6), bevelSize: Math.min(p.m * 0.08, 0.5), bevelSegments: 1, curveSegments: coarse ? 10 : 18 });
      geo2.translate(0, 0, -p.face / 2);
      const g2 = new Mesh(geo2, mat);
      const dist = a.pitchR + b.pitchR;
      g2.position.x = dist;
      meshes.push(g2);
      holder.add(g2);
      maxX = dist + b.outer;
      extentY = Math.max(a.outer, b.outer);
    }
    z1 = p.z1;
    z2 = p.z2;

    // centre the assembly and compute framing
    const cx = (minX + maxX) / 2;
    holder.position.x = -cx;
    halfW = (maxX - minX) / 2 + Math.max(extentX, 1) * 0.12;
    halfH = extentY * 1.15;
    // keep thickness visible when face is very wide
    halfH = Math.max(halfH, p.face * 0.6);
    resize();
  };

  const resize = () => {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const t = Math.tan((camera.fov * Math.PI) / 360);
    camera.position.z = Math.max(halfH / t, halfW / (t * camera.aspect)) * 1.12;
    camera.near = camera.position.z / 50;
    camera.far = camera.position.z * 8;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // ---- drag to rotate (+ inertia); vertical page scroll still works on touch
  let dragging = false;
  let lx = 0;
  let ly = 0;
  let vx = 0;
  let vy = 0;
  const down = (e: PointerEvent) => {
    dragging = true;
    lx = e.clientX;
    ly = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent) => {
    if (!dragging) return;
    vx = (e.clientX - lx) * 0.008;
    vy = (e.clientY - ly) * 0.008;
    world.rotation.y += vx;
    world.rotation.x = Math.max(-1.2, Math.min(1.2, world.rotation.x + vy));
    lx = e.clientX;
    ly = e.clientY;
  };
  const up = (e: PointerEvent) => {
    dragging = false;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);

  // ---- loop
  let raf = 0;
  let visible = true;
  let last = performance.now();
  let spin = 0;
  const frame = (now: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    if (!dragging) {
      vx *= 0.94;
      world.rotation.y += vx;
      if (params.spin) world.rotation.y += dt * 0.12;
    }
    if (params.spin) spin += dt * 0.5;
    if (meshes[0]) meshes[0].rotation.z = -Math.PI / z1 + spin;
    if (meshes[1]) {
      // B shows a gap on the line of centres when A shows a tooth; counter-rotates by the tooth ratio
      meshes[1].rotation.z = Math.PI - spin * (z1 / z2);
    }
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  const kick = () => {
    if (!raf && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) kick();
  });
  io.observe(container);
  const onVis = () => kick();
  document.addEventListener("visibilitychange", onVis);

  rebuild();
  kick();

  return {
    update: (p) => {
      const needs = p.mode !== params.mode || p.z1 !== params.z1 || p.z2 !== params.z2 || p.m !== params.m || p.face !== params.face || p.bore !== params.bore || p.keyway !== params.keyway;
      params = p;
      if (needs) rebuild();
      kick();
    },
    setTheme: (t) => {
      theme = t;
      mat.color.setHex(COLORS[t]);
      mat.metalness = t === "dark" ? 0.7 : 0.55;
      mat.envMapIntensity = t === "dark" ? 1.2 : 1.45;
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      clear();
      mat.dispose();
      envTex.dispose();
      renderer.dispose();
    },
  };
}
