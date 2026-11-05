"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { IconWhatsApp } from "@/components/ui/Icons";
import { machines } from "@/lib/data/machines";
import { waHref } from "@/lib/site";
import { whenInteracted } from "@/lib/interaction";
import type { PlaygroundParams } from "./playground-scene";

const DEFAULTS: PlaygroundParams = { mode: "single", z1: 24, z2: 12, m: 3, face: 40, bore: 30, keyway: true, spin: true };

const f = (n: number, d = 2) => (Number.isInteger(n) ? String(n) : n.toFixed(d).replace(/\.?0+$/, ""));

function Slider({ id, label, unit, min, max, step = 1, value, onChange }: { id: string; label: string; unit?: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="label !mb-0">
          {label}
        </label>
        <output htmlFor={id} className="mono text-[0.9rem] text-ink">
          {f(value)}
          {unit ? ` ${unit}` : ""}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-6 w-full cursor-pointer accent-[var(--accent)]"
      />
    </div>
  );
}

export function GearPlayground() {
  const [p, setP] = useState<PlaygroundParams>(DEFAULTS);
  const [live, setLive] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ update: (p: PlaygroundParams) => void; setTheme: (t: "light" | "dark") => void } | null>(null);
  const latest = useRef(p);
  latest.current = p;

  // push parameter changes into the scene
  useEffect(() => {
    api.current?.update(p);
  }, [p]);

  // mount the 3D scene when near, dispose when far
  useEffect(() => {
    const el = box.current;
    const cv = canvas.current;
    if (!el || !cv) return;
    let teardown: (() => void) | undefined;
    let booting = false;
    let gone = false;
    let interacted = false;
    let isNear = false;

    const boot = async () => {
      if (booting || teardown || gone || !interacted) return;
      booting = true;
      try {
        const probe = document.createElement("canvas");
        if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
        const { createPlayground } = await import("./playground-scene");
        if (gone || !el.isConnected) return;
        const themeNow = () => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
        const pg = createPlayground(el, cv, latest.current, themeNow());
        api.current = pg;
        setLive(true);
        const mo = new MutationObserver(() => pg.setTheme(themeNow()));
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        teardown = () => {
          mo.disconnect();
          pg.dispose();
          api.current = null;
          setLive(false);
          teardown = undefined;
        };
      } catch {
        /* calculator still works without 3D */
      } finally {
        booting = false;
      }
    };
    whenInteracted().then(() => {
      interacted = true;
      if (isNear) boot();
    });
    const near = new IntersectionObserver(([e]) => {
      isNear = e.isIntersecting;
      if (isNear) boot();
    }, { rootMargin: "100% 0px" });
    const far = new IntersectionObserver(([e]) => !e.isIntersecting && teardown?.(), { rootMargin: "250% 0px" });
    near.observe(el);
    far.observe(el);
    return () => {
      gone = true;
      near.disconnect();
      far.disconnect();
      teardown?.();
    };
  }, []);

  const set = <K extends keyof PlaygroundParams>(k: K, v: PlaygroundParams[K]) => setP((s) => ({ ...s, [k]: v }));

  const calc = useMemo(() => {
    const gear = (z: number) => ({ z, d: p.m * z, od: p.m * (z + 2), root: p.m * (z - 2.5) });
    const a = gear(p.z1);
    const b = gear(p.z2);
    const fits = (g: { od: number }) => machines.filter((m) => (m.kind === "hobbing" || m.kind === "shaping") && m.limits?.maxOD && g.od >= (m.limits.minOD ?? 0) && g.od <= m.limits.maxOD && p.face <= (m.limits.face ?? Infinity));
    const boreMax = a.root * 0.6;
    return {
      a,
      b,
      centre: (p.m * (p.z1 + p.z2)) / 2,
      ratio: p.z2 / p.z1,
      pitch: Math.PI * p.m,
      depth: 2.25 * p.m,
      fitsA: fits(a),
      fitsB: fits(b),
      boreClamped: p.bore > boreMax,
      boreMax,
    };
  }, [p]);

  const message = `Hi Siva Engineering, I designed this gear on your website's 3D playground.\nType: ${p.mode === "pair" ? "gear pair" : "spur gear"} (20° pressure angle)\nModule: ${f(p.m)}\nTeeth: ${p.z1}${p.mode === "pair" ? ` and ${p.z2}` : ""}\nPitch dia: ${f(calc.a.d)} mm, OD: ${f(calc.a.od)} mm\nFace width: ${f(p.face)} mm, Bore: ${f(p.bore)} mm${p.keyway ? " with keyway" : ""}${p.mode === "pair" ? `\nCentre distance: ${f(calc.centre)} mm, ratio ${f(calc.ratio, 3)}:1` : ""}\nPlease quote. Drawing attached.`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="frame ticks overflow-hidden">
          <div ref={box} className="relative h-[340px] w-full sm:h-[440px] lg:h-[min(62vh,580px)]">
            <canvas ref={canvas} className={`absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-700 active:cursor-grabbing ${live ? "opacity-100" : "opacity-0"}`} aria-label="Interactive 3D gear. Drag to rotate." role="img" />
            {!live && <p className="absolute inset-0 grid place-items-center px-8 text-center text-[0.9rem] text-mute">The 3D view loads as you scroll here. The calculator works without it.</p>}
          </div>
          <div className="flex items-center justify-between border-t border-line px-4 py-3 text-[0.8125rem] text-mute">
            <span>Drag to rotate</span>
            <label className="flex cursor-pointer items-center gap-2 text-ink">
              <input type="checkbox" checked={p.spin} onChange={(e) => set("spin", e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
              Spin
            </label>
          </div>
        </div>
      </div>

      <div className="grid content-start gap-8">
        <fieldset>
          <legend className="label mb-3">Mode</legend>
          <div className="inline-flex border border-line-strong">
            {(
              [
                ["single", "Single gear"],
                ["pair", "Gear pair"],
              ] as const
            ).map(([v, l]) => (
              <label key={v} className="cursor-pointer">
                <input type="radio" name="mode" value={v} checked={p.mode === v} onChange={() => set("mode", v)} className="peer sr-only" />
                <span className="inline-block px-5 py-2.5 text-[0.875rem] text-ink-2 transition-colors peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">{l}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6">
          <Slider id="pg-z1" label={p.mode === "pair" ? "Teeth, gear 1" : "Number of teeth"} min={8} max={120} value={p.z1} onChange={(v) => set("z1", v)} />
          {p.mode === "pair" && <Slider id="pg-z2" label="Teeth, gear 2" min={8} max={120} value={p.z2} onChange={(v) => set("z2", v)} />}
          <Slider id="pg-m" label="Module" unit="mm" min={1} max={12} step={0.5} value={p.m} onChange={(v) => set("m", v)} />
          <Slider id="pg-face" label="Face width" unit="mm" min={10} max={500} step={5} value={p.face} onChange={(v) => set("face", v)} />
          <Slider id="pg-bore" label="Bore" unit="mm" min={6} max={200} step={1} value={p.bore} onChange={(v) => set("bore", v)} />
          <label className="flex cursor-pointer items-center gap-3 text-[0.9375rem]">
            <input type="checkbox" checked={p.keyway} onChange={(e) => set("keyway", e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
            Add a keyway to the bore
          </label>
          {calc.boreClamped && <p className="text-[0.8125rem] text-mute">Bore limited to {f(calc.boreMax, 0)} mm in the preview so the gear body stays intact.</p>}
        </div>

        {(() => {
          const rows: [string, string][] = [
            ["Pitch diameter", `${f(calc.a.d)} mm`],
            ["Outside diameter", `${f(calc.a.od)} mm`],
            ["Root diameter", `${f(calc.a.root)} mm`],
            ["Circular pitch", `${f(calc.pitch)} mm`],
            ["Whole depth", `${f(calc.depth)} mm`],
            ...(p.mode === "pair"
              ? ([
                  ["Centre distance", `${f(calc.centre)} mm`],
                  ["Ratio (gear 2 : gear 1)", `${f(calc.ratio, 3)} : 1`],
                  ["Gear 2 outside dia.", `${f(calc.b.od)} mm`],
                ] as [string, string][])
              : []),
          ];
          return (
            <dl className="grid grid-cols-2 gap-px border border-line bg-line" aria-live="polite">
              {rows.map(([k, v]) => (
                <div key={k} className="bg-paper p-4">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mono mt-2 text-[1.05rem] text-ink">{v}</dd>
                </div>
              ))}
              {rows.length % 2 === 1 && <div className="bg-paper" aria-hidden />}
            </dl>
          );
        })()}

        <div className="frame ticks p-6">
          <p className="eyebrow">Can we cut it?</p>
          {calc.fitsA.length ? (
            <>
              <p className="mt-3 text-ink">
                Gear {p.mode === "pair" ? "1 " : ""}(Ø{f(calc.a.od)} mm × {f(p.face)} mm) is within the limits of:
              </p>
              <ul className="mt-3 grid gap-1.5 text-[0.9375rem]">
                {calc.fitsA.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/machines/${m.slug}`} className="u-link">
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-3 text-ink-2">
              Ø{f(calc.a.od)} mm × {f(p.face)} mm is outside the listed limits of our machines. Send us the drawing anyway and we will tell you plainly what is possible.
            </p>
          )}
          {p.mode === "pair" && (
            <p className="mt-4 border-t border-line pt-4 text-[0.875rem] text-ink-2">
              Gear 2 (Ø{f(calc.b.od)} mm): {calc.fitsB.length ? `fits ${calc.fitsB.map((m) => m.name).join(", ")}.` : "outside the listed limits — send the drawing."}
            </p>
          )}
          <p className="mt-4 text-[0.8125rem] text-mute">Standard 20° pressure angle, full-depth spur gear. Internal gears are cut on our gear shaper.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={waHref(message)} target="_blank" rel="noopener" data-lead="whatsapp" className="btn btn-wa">
            <IconWhatsApp /> Send this spec on WhatsApp
          </a>
          <button type="button" onClick={() => setP(DEFAULTS)} className="btn btn-ghost">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
