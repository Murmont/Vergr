import { formatCoins } from '../utils/helpers';

export default function CoinDisplay({ amount, size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <span className={`inline-flex items-center gap-1 font-dmmono font-medium ${sizes[size]} ${className}`}>
      <span className="gold-text">●</span>
      <span className="gold-text">{formatCoins(amount)}</span>
    </span>
  );
}
