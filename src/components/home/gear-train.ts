import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
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
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Theme = "light" | "dark";

const MOD = 0.2; // shared module → every pair meshes
const TEETH = [22, 14, 28, 12, 20, 16]; // one gear per service
// direction (radians) from gear i to gear i+1 — sweeps the chain into a gentle arc
const BEND = [0.3, -0.35, -1.0, -1.65, -2.3];

const PALETTE = {
  light: { base: 0x6f6f77, metalness: 0.3, rough: 0.5, env: 0.9, glow: 0x1d4ed8 },
  dark: { base: 0xc3c3ca, metalness: 0.4, rough: 0.45, env: 0.9, glow: 0x3d74ff },
} as const;

function gearShape(teeth: number, pitchR: number, bore: number, web: boolean) {
  const outer = pitchR + MOD;
  const root = pitchR - 1.25 * MOD;
  const step = (Math.PI * 2) / teeth;
  const s = new Shape();
  for (let i = 0; i < teeth; i++) {
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
  const hole = new Path();
  hole.absarc(0, 0, bore, 0, Math.PI * 2, true);
  s.holes.push(hole);
  if (web) {
    const n = 5;
    const at = (root + bore) / 2;
    const r = Math.max(0.12, (root - bore) * 0.22);
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2;
      const h = new Path();
      h.absarc(Math.cos(ang) * at, Math.sin(ang) * at, r, 0, Math.PI * 2, true);
      s.holes.push(h);
    }
  }
  return s;
}

export type GearTrain = {
  setActive: (i: number) => void;
  setTheme: (t: Theme) => void;
  dispose: () => void;
};

export function createGearTrain(
  container: HTMLElement,
  canvas: HTMLCanvasElement,
  label: HTMLElement | null,
  titles: string[],
  initialTheme: Theme,
): GearTrain {
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
  const pal = () => PALETTE[theme];
  const seg = coarse ? 12 : 22;

  // ---- build chain with exact meshing phase
  const group = new Group();
  scene.add(group);
  type G = { mesh: Mesh; mat: MeshStandardMaterial; R: number; N: number; rot: number; k: number; pos: Vector3; glow: number };
  const gears: G[] = [];
  let pos = new Vector3(0, 0, 0);
  let rot = 0;
  let k = 1;
  for (let i = 0; i < TEETH.length; i++) {
    const N = TEETH[i];
    const R = (N * MOD) / 2;
    const shape = gearShape(N, R, Math.max(0.2, R * 0.22), R > 1.1);
    const geo = new ExtrudeGeometry(shape, { depth: 0.5, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.025, bevelSegments: 2, curveSegments: seg });
    geo.translate(0, 0, -0.25);
    const mat = new MeshStandardMaterial({ color: pal().base, metalness: pal().metalness, roughness: pal().rough, envMapIntensity: pal().env, emissive: new Color(pal().glow), emissiveIntensity: 0 });
    const mesh = new Mesh(geo, mat);

    if (i === 0) {
      rot = 0;
    } else {
      const P = gears[i - 1];
      const alpha = BEND[i - 1];
      const dist = P.R + R;
      pos = P.pos.clone().add(new Vector3(Math.cos(alpha) * dist, Math.sin(alpha) * dist, 0));
      // phase so P's tooth meets Q's gap along the line of centres
      const pP = (Math.PI * 2) / P.N;
      const pQ = (Math.PI * 2) / N;
      const fP = (alpha - P.rot) / pP - 0.5;
      rot = alpha + Math.PI + pQ * fP;
      k = -P.k * (P.N / N);
    }
    mesh.position.copy(pos);
    group.add(mesh);
    gears.push({ mesh, mat, R, N, rot, k, pos: pos.clone(), glow: 0 });
  }

  // centre + fit
  const box = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
  gears.forEach((g) => {
    box.minX = Math.min(box.minX, g.pos.x - g.R - MOD);
    box.maxX = Math.max(box.maxX, g.pos.x + g.R + MOD);
    box.minY = Math.min(box.minY, g.pos.y - g.R - MOD);
    box.maxY = Math.max(box.maxY, g.pos.y + g.R + MOD);
  });
  group.position.set(-(box.minX + box.maxX) / 2, -(box.minY + box.maxY) / 2, 0);
  const halfW = (box.maxX - box.minX) / 2 + 0.4;
  const halfH = (box.maxY - box.minY) / 2 + 0.4;
  group.rotation.set(0.12, -0.28, 0);

  const camera = new PerspectiveCamera(30, 1, 0.1, 200);
  const resize = () => {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const t = Math.tan((camera.fov * Math.PI) / 360);
    camera.position.set(0, 0, Math.max(halfH / t, halfW / (t * camera.aspect)) * 1.04);
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // ---- state
  let active = 0;
  const setActive = (i: number) => {
    if (i < 0 || i >= gears.length) return;
    active = i;
    if (label) label.textContent = titles[i] ?? "";
  };
  setActive(0);

  let scrollY = window.scrollY;
  const onScroll = () => (scrollY = window.scrollY);
  window.addEventListener("scroll", onScroll, { passive: true });

  const target = { x: 0, y: 0 };
  const sm = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    const r = container.getBoundingClientRect();
    target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  // ---- loop (paused when hidden / off-screen)
  let raf = 0;
  let visible = true;
  let last = performance.now();
  let spin = 0;
  const proj = new Vector3();
  const frame = (now: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    spin += dt * 0.35;
    const phi = spin + scrollY * 0.0024; // scroll turns the whole train

    const a = 1 - Math.pow(1 - 0.06, dt * 60);
    sm.x += (target.x - sm.x) * a;
    sm.y += (target.y - sm.y) * a;
    group.rotation.y = -0.28 + sm.x * 0.16;
    group.rotation.x = 0.12 + sm.y * 0.08;

    gears.forEach((g, i) => {
      g.mesh.rotation.z = g.rot + g.k * phi;
      const want = i === active ? 1 : 0;
      g.glow += (want - g.glow) * (1 - Math.pow(1 - 0.12, dt * 60));
      g.mat.emissiveIntensity = g.glow * 0.65;
      const sc = 1 + g.glow * 0.035;
      g.mesh.scale.set(sc, sc, 1);
    });

    // keep the HTML label glued to the active gear
    if (label) {
      const g = gears[active];
      proj.copy(g.pos).applyMatrix4(group.matrixWorld).project(camera);
      const x = (proj.x * 0.5 + 0.5) * container.clientWidth;
      const y = (-proj.y * 0.5 + 0.5) * container.clientHeight;
      label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      label.style.opacity = "1";
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
  kick();

  const setTheme = (t: Theme) => {
    theme = t;
    const p = PALETTE[t];
    gears.forEach((g) => {
      g.mat.color.setHex(p.base);
      g.mat.metalness = p.metalness;
      g.mat.roughness = p.rough;
      g.mat.envMapIntensity = p.env;
      g.mat.emissive.setHex(p.glow);
    });
  };

  const dispose = () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("pointermove", onPointer);
    document.removeEventListener("visibilitychange", onVis);
    gears.forEach((g) => {
      g.mesh.geometry.dispose();
      g.mat.dispose();
    });
    envTex.dispose();
    renderer.dispose();
  };

  return { setActive, setTheme, dispose };
}
