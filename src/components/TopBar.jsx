import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function TopBar({ 
  title, 
  showBack = false, 
  actions, 
  transparent = false, 
  showWallet = false, 
  balance = 0 
}) {
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 z-40 flex items-center justify-between px-4 py-3 ${
      transparent ? 'bg-transparent' : 'bg-bg-dark/95 backdrop-blur-xl border-b border-white/5'
    }`}>
      {/* Left Side: Back Button & Title */}
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
      
      {/* Right Side: Wallet & Actions */}
      <div className="flex items-center gap-3">
        {showWallet && (
          <button 
            onClick={() => navigate('/wallet')} 
            className="flex items-center gap-1.5 bg-surface-2 px-3 py-1.5 rounded-full border border-surface-border hover:border-primary transition-colors"
          >
            <Icon name="coins" size={16} className="text-yellow-400" />
            <span className="text-xs font-bold text-white font-mono">{balance.toLocaleString()}</span>
          </button>
        )}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}