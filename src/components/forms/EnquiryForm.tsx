"use client";

import { useEffect, useRef, useState } from "react";
import { IconPhone, IconWhatsApp } from "@/components/ui/Icons";
import { telHref, waHref, primaryPhone } from "@/lib/site";
import { services } from "@/lib/data/services";
import { machines } from "@/lib/data/machines";

type Status = "idle" | "sending" | "done" | "error";

export function EnquiryForm({
  sourcePage,
  defaultService = "",
  defaultMachine = "",
  prefill,
}: {
  sourcePage: string;
  defaultService?: string;
  defaultMachine?: string;
  prefill?: { odMm?: string; faceWidthMm?: string; moduleValue?: string };
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [ref, setRef] = useState("");
  const [summary, setSummary] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const qs = new URLSearchParams(location.search);

    const payload = {
      name: v("name"),
      phone: v("phone"),
      email: v("email"),
      company: v("company"),
      service: v("service"),
      machine: v("machine"),
      component: v("component"),
      material: v("material"),
      odMm: v("odMm"),
      faceWidthMm: v("faceWidthMm"),
      moduleValue: v("moduleValue"),
      quantity: v("quantity"),
      message: v("message"),
      website: v("website"),
      sourcePage,
      utmSource: qs.get("utm_source") ?? "",
      utmMedium: qs.get("utm_medium") ?? "",
      utmCampaign: qs.get("utm_campaign") ?? "",
      referrer: document.referrer,
      elapsed: Date.now() - startedAt.current,
    };

    const lines = [
      "Hi Siva Engineering, I just sent an enquiry from your website.",
      `Name: ${payload.name}`,
      payload.company && `Company: ${payload.company}`,
      payload.service && `Service: ${payload.service}`,
      payload.machine && `Machine: ${payload.machine}`,
      payload.component && `Component: ${payload.component}${payload.material ? ` (${payload.material})` : ""}`,
      payload.odMm && `OD: ${payload.odMm} mm`,
      payload.faceWidthMm && `Face width: ${payload.faceWidthMm} mm`,
      payload.moduleValue && `Module: ${payload.moduleValue}`,
      payload.quantity && `Quantity: ${payload.quantity}`,
      "I'll share the drawing here.",
    ].filter(Boolean);

    setStatus("sending");
    setError("");
    setFields({});
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setRef(data.ref ?? "");
        setSummary(lines.join("\n"));
        setStatus("done");
        return;
      }
      setFields(data.fields ?? {});
      setError(data.error ?? "Something went wrong.");
      setSummary(lines.join("\n"));
      setStatus(res.status === 400 ? "idle" : "error");
    } catch {
      setSummary(lines.join("\n"));
      setError("Network problem — your enquiry was not sent.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="frame ticks p-8 md:p-10" role="status">
        <p className="eyebrow">Enquiry received{ref ? ` · Ref ${ref}` : ""}</p>
        <h3 className="h3 mt-4">Thank you — we will get back to you.</h3>
        <p className="mt-3 max-w-md text-ink-2">
          For the fastest quote, send your drawing or a clear photo on WhatsApp now. Your details are already filled in.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={waHref(summary)} target="_blank" rel="noopener" className="btn btn-wa" data-lead="whatsapp">
            <IconWhatsApp /> Send drawing on WhatsApp
          </a>
          <a href={telHref()} className="btn btn-ghost" data-lead="call">
            <IconPhone /> Call us
          </a>
        </div>
      </div>
    );
  }

  const err = (k: string) => fields[k] && <p className="mt-1 text-[0.8125rem] text-[#b3261e] dark:text-[#ff8a80]">{fields[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-6 md:grid-cols-2" aria-describedby={error ? "enq-error" : undefined}>
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="label" htmlFor="enq-name">
          Name *
        </label>
        <input id="enq-name" name="name" className="field" autoComplete="name" required placeholder="Your name" aria-invalid={!!fields.name} />
        {err("name")}
      </div>
      <div>
        <label className="label" htmlFor="enq-phone">
          Phone / WhatsApp *
        </label>
        <input id="enq-phone" name="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" required placeholder="+91 …" aria-invalid={!!fields.phone} />
        {err("phone")}
      </div>
      <div>
        <label className="label" htmlFor="enq-company">
          Company
        </label>
        <input id="enq-company" name="company" className="field" autoComplete="organization" placeholder="Company or workshop" />
      </div>
      <div>
        <label className="label" htmlFor="enq-email">
          Email
        </label>
        <input id="enq-email" name="email" type="email" inputMode="email" className="field" autoComplete="email" placeholder="you@company.com" aria-invalid={!!fields.email} />
        {err("email")}
      </div>
      <div>
        <label className="label" htmlFor="enq-service">
          Service
        </label>
        <select id="enq-service" name="service" className="field" defaultValue={defaultService}>
          <option value="">Not sure yet</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label" htmlFor="enq-machine">
          Machine (optional)
        </label>
        <select id="enq-machine" name="machine" className="field" defaultValue={defaultMachine}>
          <option value="">Best match</option>
          {machines.map((m) => (
            <option key={m.slug} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <details className="group md:col-span-2" open={!!(prefill?.odMm || prefill?.faceWidthMm)}>
        <summary className="eyebrow flex cursor-pointer list-none items-center gap-3 py-1 text-ink">
          <span className="grid h-5 w-5 place-items-center border border-line-strong text-[0.8rem] leading-none transition-transform group-open:rotate-45">+</span>
          Component details — faster, more accurate quote
        </summary>
        <div className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
          <div>
            <label className="label" htmlFor="enq-component">
              Component
            </label>
            <input id="enq-component" name="component" className="field" placeholder="e.g. helical pinion" />
          </div>
          <div>
            <label className="label" htmlFor="enq-material">
              Material
            </label>
            <input id="enq-material" name="material" className="field" placeholder="e.g. EN8, EN24" />
          </div>
          <div className="grid grid-cols-3 gap-6 md:col-span-2">
            <div>
              <label className="label" htmlFor="enq-od">
                OD (mm)
              </label>
              <input id="enq-od" name="odMm" type="number" inputMode="numeric" min={1} className="field" defaultValue={prefill?.odMm} />
            </div>
            <div>
              <label className="label" htmlFor="enq-face">
                Face (mm)
              </label>
              <input id="enq-face" name="faceWidthMm" type="number" inputMode="numeric" min={1} className="field" defaultValue={prefill?.faceWidthMm} />
            </div>
            <div>
              <label className="label" htmlFor="enq-module">
                Module
              </label>
              <input id="enq-module" name="moduleValue" inputMode="decimal" className="field" defaultValue={prefill?.moduleValue} />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="label" htmlFor="enq-qty">
              Quantity
            </label>
            <input id="enq-qty" name="quantity" className="field" placeholder="e.g. 1 pc, or 200 / month" />
          </div>
        </div>
      </details>

      <div className="md:col-span-2">
        <label className="label" htmlFor="enq-message">
          Message
        </label>
        <textarea id="enq-message" name="message" className="field" placeholder="Anything we should know — tolerance, urgency, drawing details…" />
      </div>

      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60" data-magnetic>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-[0.8125rem] text-mute">We reply on call or WhatsApp. No spam.</p>
      </div>

      {(error || status === "error") && (
        <div id="enq-error" role="alert" className="frame p-5 md:col-span-2">
          <p className="text-[0.9375rem] text-ink">{error}</p>
          {status === "error" && (
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={waHref(summary || "Hi Siva Engineering, I'd like a quote.")} target="_blank" rel="noopener" className="btn btn-wa" data-lead="whatsapp">
                <IconWhatsApp /> Send on WhatsApp instead
              </a>
              <a href={telHref()} className="btn btn-ghost" data-lead="call">
                <IconPhone /> Call {primaryPhone.display}
              </a>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
