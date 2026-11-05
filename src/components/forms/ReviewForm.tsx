"use client";

import { useEffect, useRef, useState } from "react";

export function ReviewForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const t0 = useRef(0);
  useEffect(() => {
    t0.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    setState("sending");
    try {
      const res = await fetch("/api/review", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, elapsed: Date.now() - t0.current }) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) return setState("done");
      setMsg(data.error ?? "Something went wrong.");
      setState("error");
    } catch {
      setMsg("Network problem — please try again.");
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="frame ticks p-8" role="status">
        <p className="eyebrow">Received</p>
        <p className="h3 mt-3">Thank you for your feedback.</p>
        <p className="mt-2 text-ink-2">We review every note before it appears on the site.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div>
        <label className="label" htmlFor="rv-name">
          Name *
        </label>
        <input id="rv-name" name="name" className="field" required autoComplete="name" />
      </div>
      <div>
        <label className="label" htmlFor="rv-company">
          Company
        </label>
        <input id="rv-company" name="company" className="field" autoComplete="organization" />
      </div>
      <div>
        <label className="label" htmlFor="rv-role">
          Role
        </label>
        <input id="rv-role" name="role" className="field" placeholder="e.g. Production manager" />
      </div>
      <div>
        <label className="label" htmlFor="rv-rating">
          Rating
        </label>
        <select id="rv-rating" name="rating" className="field" defaultValue="">
          <option value="">Skip</option>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} / 5
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="label" htmlFor="rv-body">
          Your feedback *
        </label>
        <textarea id="rv-body" name="body" className="field" required minLength={15} maxLength={900} placeholder="What did we machine for you, and how did it go?" />
      </div>
      <div className="flex flex-wrap items-center gap-4 md:col-span-2">
        <button className="btn btn-primary disabled:opacity-60" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Share feedback"}
        </button>
        {state === "error" && (
          <p role="alert" className="text-[0.875rem] text-ink-2">
            {msg}
          </p>
        )}
      </div>
    </form>
  );
}
