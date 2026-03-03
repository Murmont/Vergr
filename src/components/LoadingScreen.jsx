export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-bg-dark flex flex-col items-center justify-center z-[100]">
      <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-[0_0_40px_rgba(77,255,212,0.2)] animate-pulse-glow mb-6">
        <span className="material-symbols-outlined text-white font-bold" style={{ fontSize: 36 }}>stadia_controller</span>
      </div>
      <h1 className="font-syne text-2xl font-bold text-gradient mb-2">VERGR</h1>
      <p className="text-text-muted text-sm">Where Gamers Converge</p>
      <div className="mt-8 w-32 h-1 bg-surface-2 rounded-full overflow-hidden">
        <div className="h-full bg-brand-gradient rounded-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      </div>
    </div>
  );
}
