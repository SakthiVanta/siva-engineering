import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  Color,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  Group,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  NormalBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Path,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  Shape,
  ShaderMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Theme = "light" | "dark";

const PALETTE = {
  light: { metal: 0x5d5d64, env: 1.5, metalness: 0.55, rough: 0.34, line: 0x1b1b1d, lineOpacity: 0.28, wire: 0x1b1b1d },
  dark: { metal: 0xcfcfd6, env: 1.2, metalness: 0.7, rough: 0.32, line: 0xececef, lineOpacity: 0.3, wire: 0xdcdce2 },
} as const;

/** Gear outline: trapezoid teeth centred on half-steps, bore + keyway, optional lightening holes. */
function gearShape(teeth: number, pitchR: number, mod: number, bore: number, holes: { n: number; r: number; at: number } | null, seg: number) {
  const outer = pitchR + mod;
  const root = pitchR - 1.25 * mod;
  const step = (Math.PI * 2) / teeth;
  const s = new Shape();
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts: [number, number][] = [
      [root, a + step * 0.04],
      [pitchR, a + step * 0.2],
      [outer, a + step * 0.34],
      [outer, a + step * 0.66],
      [pitchR, a + step * 0.8],
      [root, a + step * 0.96],
    ];
    pts.forEach(([r, ang], j) => {
      const x = r * Math.cos(ang);
      const y = r * Math.sin(ang);
      if (i === 0 && j === 0) s.moveTo(x, y);
      else s.lineTo(x, y);
    });
  }
  s.closePath();

  // Bore with keyway notch at the top
  const bp = new Path();
  const kw = bore * 0.34;
  const kd = bore * 0.3;
  const ka = Math.asin(kw / bore);
  bp.moveTo(bore * Math.cos(Math.PI / 2 - ka) * 1, bore * Math.sin(Math.PI / 2 - ka));
  bp.lineTo(kw, bore + kd);
  bp.lineTo(-kw, bore + kd);
  bp.lineTo(-bore * Math.sin(ka), bore * Math.cos(ka));
  bp.absarc(0, 0, bore, Math.PI / 2 + ka, Math.PI / 2 - ka + Math.PI * 2, false);
  s.holes.push(bp);

  if (holes) {
    for (let i = 0; i < holes.n; i++) {
      const ang = (i / holes.n) * Math.PI * 2 + Math.PI / holes.n;
      const hp = new Path();
      hp.absarc(Math.cos(ang) * holes.at, Math.sin(ang) * holes.at, holes.r, 0, Math.PI * 2, true);
      s.holes.push(hp);
    }
  }
  void seg;
  return s;
}

function buildGear(opts: {
  teeth: number;
  pitchR: number;
  mod: number;
  bore: number;
  thickness: number;
  holes: { n: number; r: number; at: number } | null;
  curveSegments: number;
  material: MeshStandardMaterial;
}) {
  const shape = gearShape(opts.teeth, opts.pitchR, opts.mod, opts.bore, opts.holes, opts.curveSegments);
  const geo = new ExtrudeGeometry(shape, {
    depth: opts.thickness,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.03,
    bevelSegments: 2,
    curveSegments: opts.curveSegments,
  });
  geo.translate(0, 0, -opts.thickness / 2);
  return new Mesh(geo, opts.material);
}

/** Thin technical pitch circle */
function pitchCircle(radius: number, color: number, opacity: number) {
  const pts: number[] = [];
  const n = 128;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    pts.push(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  }
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(pts, 3));
  return new LineLoop(g, new LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
}

export type GearScene = { dispose: () => void; setTheme: (t: Theme) => void };

export function createGearScene(container: HTMLElement, canvas: HTMLCanvasElement, initialTheme: Theme, onReady?: () => void): GearScene {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const dprCap = coarse ? 1.5 : 2;
  const dpr = Math.min(window.devicePixelRatio || 1, dprCap);

  const renderer = new WebGLRenderer({ canvas, antialias: dpr < 2, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  pmrem.dispose();

  const camera = new PerspectiveCamera(30, 1, 0.1, 100);

  // ---- scan uniforms shared by the solid and the cage
  const uScan = {
    uScanOrigin: { value: new Vector3(-9, -6, 0) },
    uScanRadius: { value: 0 },
    uScanOn: { value: 1 },
  };

  let theme: Theme = initialTheme;
  const metal = new MeshStandardMaterial({ color: PALETTE[theme].metal, metalness: PALETTE[theme].metalness, roughness: PALETTE[theme].rough, envMapIntensity: PALETTE[theme].env });
  const key = new DirectionalLight(0xffffff, 1.6);
  key.position.set(-4, 5, 6);
  scene.add(key, new AmbientLight(0xffffff, 0.25));
  metal.onBeforeCompile = (shader) => {
    shader.uniforms.uScanOrigin = uScan.uScanOrigin;
    shader.uniforms.uScanRadius = uScan.uScanRadius;
    shader.uniforms.uScanOn = uScan.uScanOn;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWPos;\nuniform vec3 uScanOrigin;\nuniform float uScanRadius;\nuniform float uScanOn;")
      .replace("#include <clipping_planes_fragment>", "#include <clipping_planes_fragment>\nif (uScanOn > 0.5 && distance(vWPos, uScanOrigin) > uScanRadius - 0.9) discard;");
  };

  const MOD = 0.2;
  const NA = 24;
  const NB = 12;
  const RA = (NA * MOD) / 2;
  const RB = (NB * MOD) / 2;
  const seg = coarse ? 14 : 24;

  const gearA = buildGear({ teeth: NA, pitchR: RA, mod: MOD, bore: 0.5, thickness: 0.62, holes: { n: 6, r: 0.27, at: 1.42 }, curveSegments: seg, material: metal });
  const gearB = buildGear({ teeth: NB, pitchR: RB, mod: MOD, bore: 0.34, thickness: 0.62, holes: null, curveSegments: seg, material: metal });

  const world = new Group();
  const ax = -1.3;
  gearA.position.set(ax, 0, 0);
  gearB.position.set(ax + RA + RB, 0, 0);
  const circA = pitchCircle(RA, PALETTE[theme].line, PALETTE[theme].lineOpacity);
  const circB = pitchCircle(RB, PALETTE[theme].line, PALETTE[theme].lineOpacity);
  circA.position.copy(gearA.position).setZ(-0.5);
  circB.position.copy(gearB.position).setZ(-0.5);
  world.add(circA, circB, gearA, gearB);
  world.rotation.set(0.2, -0.38, 0);
  scene.add(world);

  // ---- wireframe cage (entrance only; disposed when the scan completes)
  const cageMat = new ShaderMaterial({
    uniforms: { ...uScan, uColor: { value: new Color(PALETTE[theme].wire) }, uOpacity: { value: 1 } },
    vertexShader: "varying vec3 vWPos; void main(){ vWPos=(modelMatrix*vec4(position,1.0)).xyz; gl_Position=projectionMatrix*viewMatrix*vec4(vWPos,1.0); }",
    fragmentShader:
      "varying vec3 vWPos; uniform vec3 uScanOrigin; uniform float uScanRadius; uniform vec3 uColor; uniform float uOpacity; void main(){ float d=distance(vWPos,uScanOrigin); float rim=exp(-pow((d-uScanRadius)/0.55,2.0)); float trail=smoothstep(uScanRadius,uScanRadius-3.6,d); float a=(rim*1.7+trail*0.34)*uOpacity; if(d>uScanRadius+0.8||a<0.01) discard; gl_FragColor=vec4(uColor,clamp(a,0.0,1.0)); }",
    transparent: true,
    depthWrite: false,
    blending: theme === "dark" ? AdditiveBlending : NormalBlending,
  });
  const cageA = new LineSegments(new EdgesGeometry(gearA.geometry, 28), cageMat);
  const cageB = new LineSegments(new EdgesGeometry(gearB.geometry, 28), cageMat);
  cageA.position.copy(gearA.position);
  cageB.position.copy(gearB.position);
  world.add(cageA, cageB);
  let cageAlive = true;

  // ---- layout
  let w = 1;
  let h = 1;
  const resize = () => {
    w = Math.max(1, container.clientWidth);
    h = Math.max(1, container.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const halfW = 4.35;
    const halfH = 3.0;
    const t = Math.tan((camera.fov * Math.PI) / 360);
    const dist = Math.max(halfH / t, halfW / (t * camera.aspect));
    camera.position.set(0, 0, dist);
    camera.updateProjectionMatrix();
    world.position.x = -0.15 - ax * 0 + 0.0;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // ---- pointer (non-touch) — damped target split across camera + objects
  const target = { x: 0, y: 0 };
  const smooth = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    target.x = (e.clientX / window.innerWidth) * 2 - 1;
    target.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onLeave = () => {
    target.x = 0;
    target.y = 0;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);

  let scrollY = window.scrollY;
  const onScroll = () => (scrollY = window.scrollY);
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- loop with visibility pausing
  let raf = 0;
  let visible = true;
  let last = performance.now();
  let spin = 0;
  let scanT = 0;
  const SCAN_DUR = 2.6;
  const MAX_R = 17;
  const base = world.rotation.clone();
  const ease = (t: number) => 1 - Math.pow(1 - t, 1.35);
  const smoothstep = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  let readyFired = false;

  const frame = (now: number) => {
    raf = 0;
    if (!visible || document.hidden) return;
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;

    // scan
    if (cageAlive) {
      scanT = Math.min(1, scanT + dt / SCAN_DUR);
      uScan.uScanRadius.value = ease(scanT) * MAX_R;
      cageMat.uniforms.uOpacity.value = Math.min(1, scanT / 0.06) * (1 - smoothstep(0.72, 1, scanT));
      if (scanT >= 1) {
        uScan.uScanOn.value = 0;
        world.remove(cageA, cageB);
        cageA.geometry.dispose();
        cageB.geometry.dispose();
        cageMat.dispose();
        cageAlive = false;
      }
    }
    if (!readyFired) {
      readyFired = true;
      onReady?.();
    }

    // damped pointer
    const alpha = 1 - Math.pow(1 - 0.055, dt * 60);
    smooth.x += (target.x - smooth.x) * alpha;
    smooth.y += (target.y - smooth.y) * alpha;
    camera.position.x = -smooth.x * 0.7;
    camera.position.y = smooth.y * 0.45;
    camera.lookAt(camera.position.x * 0.42, camera.position.y * 0.42, 0);
    world.rotation.y = base.y + smooth.x * 0.14;
    world.rotation.x = base.x + smooth.y * 0.07;

    // mesh rotation: continuous spin + a little scroll-driven turn
    spin += dt * 0.28;
    const phi = spin + scrollY * 0.0016;
    gearA.rotation.z = phi - Math.PI / NA; // tooth centred on the +x axis
    gearB.rotation.z = -phi * (NA / NB);
    circA.rotation.z = gearA.rotation.z;
    circB.rotation.z = gearB.rotation.z;

    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };

  const kick = () => {
    if (!raf && visible && !document.hidden) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  };
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) kick();
  });
  io.observe(container);
  const onVis = () => kick();
  document.addEventListener("visibilitychange", onVis);
  kick();

  const setTheme = (t: Theme) => {
    theme = t;
    const p = PALETTE[t];
    metal.color.setHex(p.metal);
    metal.envMapIntensity = p.env;
    metal.metalness = p.metalness;
    metal.roughness = p.rough;
    [circA, circB].forEach((c) => {
      const m = c.material as LineBasicMaterial;
      m.color.setHex(p.line);
      m.opacity = p.lineOpacity;
    });
    cageMat.uniforms.uColor.value.setHex(p.wire);
    cageMat.blending = t === "dark" ? AdditiveBlending : NormalBlending;
    cageMat.needsUpdate = true;
  };

  const dispose = () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", onScroll);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("visibilitychange", onVis);
    gearA.geometry.dispose();
    gearB.geometry.dispose();
    metal.dispose();
    circA.geometry.dispose();
    circB.geometry.dispose();
    (circA.material as LineBasicMaterial).dispose();
    (circB.material as LineBasicMaterial).dispose();
    if (cageAlive) {
      cageA.geometry.dispose();
      cageB.geometry.dispose();
      cageMat.dispose();
    }
    envTex.dispose();
    renderer.dispose();
  };

  return { dispose, setTheme };
}
