"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { IconWhatsApp } from "@/components/ui/Icons";
import { waHref } from "@/lib/site";
import { machines } from "@/lib/data/machines";

type Op = "hobbing" | "shaping" | "slotting" | "broaching" | "grinding";

const OPS: { v: Op; label: string }[] = [
  { v: "hobbing", label: "Gear hobbing" },
  { v: "shaping", label: "Gear shaping" },
  { v: "slotting", label: "Keyway slotting" },
  { v: "broaching", label: "Broaching" },
  { v: "grinding", label: "Hob / tool grinding" },
];

/**
 * Checks a part against the machine limits printed in the company catalog.
 * It never promises more than the catalog states — anything outside the listed range
 * is routed to "send us the drawing" rather than a refusal.
 */
export function CapacityChecker({ compact = false }: { compact?: boolean }) {
  const [op, setOp] = useState<Op>("hobbing");
  const [od, setOd] = useState("");
  const [face, setFace] = useState("");
  const [key, setKey] = useState("");

  const result = useMemo(() => {
    const OD = Number(od);
    const FW = Number(face);
    const K = Number(key);

    if (op === "grinding")
      return { state: "ok" as const, title: "We regrind hobs and cutting tools", text: "Send the hob or a photo with its module, diameter and bore.", fits: machines.filter((m) => m.kind === "grinding") };

    if (op === "broaching")
      return { state: "ok" as const, title: "Broaching on a 10-ton machine", text: "Send the bore diameter and key or spline size so we can confirm the broach tooling.", fits: machines.filter((m) => m.kind === "broaching") };

    if (op === "slotting") {
      if (!K) return { state: "idle" as const, title: "Enter the key width", text: "Our slotting machine 1 cuts keyways from 5 mm to 20 mm.", fits: [] };
      const m1 = machines.find((m) => m.slug === "slotting-machine-1")!;
      if (K >= 5 && K <= 20) return { state: "ok" as const, title: `A ${K} mm key is within range`, text: "Slotting Machine 1 covers 5–20 mm keys. Send the bore and key depth to confirm.", fits: machines.filter((m) => m.kind === "slotting") };
      return { state: "ask" as const, title: "Outside the listed 5–20 mm range", text: "Send us the drawing — we will tell you honestly whether we can help.", fits: [m1] };
    }

    // hobbing / shaping — match by catalog OD and face limits
    const pool = machines.filter((m) => m.kind === op && m.limits);
    if (!OD) return { state: "idle" as const, title: "Enter the blank diameter", text: op === "hobbing" ? "Our hobbing range runs from Ø25 mm to Ø1250 mm." : "Our gear shaper takes Ø20 mm to Ø200 mm.", fits: [] };
    const fits = pool.filter((m) => OD >= (m.limits!.minOD ?? 0) && OD <= (m.limits!.maxOD ?? Infinity) && (!FW || FW <= (m.limits!.face ?? Infinity)));
    if (fits.length)
      return {
        state: "ok" as const,
        title: `Fits on ${fits.length === 1 ? "our " + fits[0].name : fits.length + " of our machines"}`,
        text: "Based on diameter and face width. We still confirm module, cutter and set-up against your drawing.",
        fits,
      };
    const maxOD = Math.max(...pool.map((m) => m.limits!.maxOD ?? 0));
    const tooBig = OD > maxOD;
    return {
      state: "ask" as const,
      title: tooBig ? `Above our listed range (Ø${maxOD} mm)` : "Outside the listed limits",
      text: "Send the drawing — some parts can still be set up differently, and we will tell you plainly.",
      fits: [],
    };
  }, [op, od, face, key]);

  const message = `Hi Siva Engineering, I checked capacity on your website. Operation: ${OPS.find((o) => o.v === op)?.label}.${od ? ` OD: ${od} mm.` : ""}${face ? ` Face: ${face} mm.` : ""}${key ? ` Key: ${key} mm.` : ""} Please quote. Drawing attached.`;

  return (
    <div className={`grid gap-10 ${compact ? "lg:grid-cols-2" : "lg:grid-cols-[1fr_1fr]"}`}>
      <div className="grid content-start gap-6">
        <fieldset>
          <legend className="label mb-3">Operation</legend>
          <div className="flex flex-wrap gap-2">
            {OPS.map((o) => (
              <label key={o.v} className="cursor-pointer">
                <input type="radio" name="op" value={o.v} checked={op === o.v} onChange={() => setOp(o.v)} className="peer sr-only" />
                <span className="inline-block border border-line-strong px-3.5 py-2 text-[0.875rem] text-ink-2 transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink">
                  {o.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {(op === "hobbing" || op === "shaping") && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="label" htmlFor="cc-od">
                Blank OD (mm)
              </label>
              <input id="cc-od" className="field" type="number" inputMode="numeric" min={1} value={od} onChange={(e) => setOd(e.target.value)} placeholder="e.g. 180" />
            </div>
            <div>
              <label className="label" htmlFor="cc-face">
                Face width (mm)
              </label>
              <input id="cc-face" className="field" type="number" inputMode="numeric" min={1} value={face} onChange={(e) => setFace(e.target.value)} placeholder="e.g. 50" />
            </div>
          </div>
        )}
        {op === "slotting" && (
          <div>
            <label className="label" htmlFor="cc-key">
              Key width (mm)
            </label>
            <input id="cc-key" className="field" type="number" inputMode="decimal" min={1} value={key} onChange={(e) => setKey(e.target.value)} placeholder="e.g. 12" />
          </div>
        )}
      </div>

      <div className="frame ticks p-6 md:p-8" aria-live="polite">
        <p className="eyebrow">{result.state === "ok" ? "Within range" : result.state === "ask" ? "Send us the drawing" : "Result"}</p>
        <h3 className="h3 mt-3">{result.title}</h3>
        <p className="mt-3 text-ink-2">{result.text}</p>

        {result.fits.length > 0 && (
          <ul className="mt-5 grid gap-2 border-t border-line pt-5">
            {result.fits.map((m) => (
              <li key={m.slug}>
                <Link href={`/machines/${m.slug}`} className="group flex items-baseline justify-between gap-4 text-[0.9375rem]">
                  <span className="u-link">{m.name}</span>
                  <span className="mono text-[0.75rem] text-mute">{m.specs[0]?.[1]}{m.specs[1] ? ` – ${m.specs[1][1]}` : ""}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <a href={waHref(message)} target="_blank" rel="noopener" data-lead="whatsapp" className="btn btn-wa mt-7 w-full sm:w-auto">
          <IconWhatsApp /> Confirm on WhatsApp
        </a>
      </div>
    </div>
  );
}
