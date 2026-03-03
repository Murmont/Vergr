import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loading) {
        navigate(currentUser ? '/' : '/login', { replace: true });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentUser, loading, navigate]);

  return (
    <div className="screen-container items-center justify-center min-h-screen bg-bg-dark">
      <div className="flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-[0_0_60px_rgba(77,255,212,0.3)] animate-pulse-glow mb-8">
          <span className="material-symbols-outlined text-white" style={{ fontSize: 48 }}>stadia_controller</span>
        </div>
        <h1 className="font-syne text-4xl font-extrabold text-gradient tracking-tight mb-2">VERGR</h1>
        <p className="text-text-secondary text-base font-medium">Where Gamers Converge</p>
        <div className="mt-12 w-40 h-1 bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-brand-gradient rounded-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        </div>
      </div>
    </div>
  );
}
