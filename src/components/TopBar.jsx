import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function TopBar({ title, showBack = false, actions, transparent = false }) {
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 z-40 flex items-center justify-between px-4 py-3 ${
      transparent ? 'bg-transparent' : 'bg-bg-dark/95 backdrop-blur-xl border-b border-white/5'
    }`}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-surface-2/80 flex items-center justify-center hover:bg-surface-3 transition-colors"
          >
            <Icon name="arrow_back" size={20} />
          </button>
        )}
        {title && (
          <h1 className="font-syne text-lg font-bold text-text-primary">{title}</h1>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
