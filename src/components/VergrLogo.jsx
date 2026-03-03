export default function VergrLogo({ size = 48, showText = false, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="rounded-xl bg-brand-gradient flex items-center justify-center shadow-[0_0_20px_rgba(77,255,212,0.3)]"
        style={{ width: size, height: size }}
      >
        <span className="material-symbols-outlined text-white font-bold" style={{ fontSize: size * 0.6 }}>
          stadia_controller
        </span>
      </div>
      {showText && (
        <h1 className="font-syne text-2xl font-extrabold text-gradient tracking-tight">VERGR</h1>
      )}
    </div>
  );
}
