/** Decorative light behind a section. Place inside a `relative isolate overflow-hidden` parent. */
export function Aura({ soft = false }: { soft?: boolean }) {
  return (
    <div className="aura" aria-hidden data-soft={soft ? "" : undefined}>
      <i className="a1" />
      <i className="a2" />
      <i className="a3" />
    </div>
  );
}
