export default function PageHeader({ eyebrow, title, children }) {
  return (
    <header className="page-header">
      <div className="halftone-bg" style={{ position: "absolute", inset: 0 }} />
      <div className="container position-relative">
        <p className="eyebrow mb-2" style={{ color: "var(--mh-ice)" }}>{eyebrow}</p>
        <h1>{title}</h1>
        {children && <p className="text-grey" style={{ maxWidth: 560 }}>{children}</p>}
      </div>
    </header>
  );
}
