import { getTier } from '../utils/helpers';
import Icon from './Icon';

const TIER_RING_COLORS = {
  Bronze: 'ring-amber-600',
  Silver: 'ring-gray-400',
  Gold: 'ring-brand-gold',
  Platinum: 'ring-blue-400',
  'Diamond Apex Elite': '',
};

export default function UserAvatar({ 
  src, 
  size = 40, 
  tier, 
  isVerified, 
  isLive, 
  showTierRing = true, 
  className = '' 
}) {
  // Detailed tier data resolution to handle strings or numbers
  const tierData = tier 
    ? (typeof tier === 'string' 
        ? getTier(
            tier === 'Bronze' ? 0 : 
            tier === 'Silver' ? 100 : 
            tier === 'Gold' ? 500 : 
            tier === 'Platinum' ? 1500 : 2000
          ) 
        : getTier(tier)) 
    : null;

  const ringColor = tierData ? TIER_RING_COLORS[tierData.name] : '';
  const isDiamond = tierData?.name === 'Diamond Apex Elite';

  return (
    <div 
      className={`relative inline-flex shrink-0 ${className}`} 
      style={{ width: size, height: size }}
    >
      {/* Holographic ring for Diamond tier */}
      {isDiamond && showTierRing && (
        <div
          className="absolute -inset-[3px] rounded-full animate-spin-slow"
          style={{ 
            background: 'conic-gradient(#4DFFD4, #7B6FFF, #C87FFF, #F5C542, #4DFFD4)',
            zIndex: 0
          }}
        />
      )}

      {/* Regular tier ring / Main Avatar Image */}
      <img
        src={src || `https://api.dicebear.com/7.x/avataaars/svg?seed=default`}
        alt="Avatar"
        className={`rounded-full object-cover relative z-10 ${
          showTierRing && !isDiamond && ringColor ? `ring-2 ${ringColor}` : ''
        } ${isDiamond ? 'ring-2 ring-bg-dark' : ''}`}
        style={{ 
          width: size, 
          height: size,
          backgroundColor: '#1A1A1A' 
        }}
      />

      {/* Live indicator overlay */}
      {isLive && (
        <div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20 bg-brand-ember px-1.5 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-wider"
          style={{ whiteSpace: 'nowrap' }}
        >
          LIVE
        </div>
      )}

      {/* Verified badge overlay */}
      {isVerified && (
        <div 
          className="absolute -bottom-0.5 -right-0.5 z-20 w-4 h-4 rounded-full bg-brand-cyan flex items-center justify-center border-2 border-bg-dark"
        >
          <Icon name="check" size={10} className="text-bg-dark font-bold" />
        </div>
      )}

      {/* Custom Styles for Holographic Animation */}
      <style 
        dangerouslySetInnerHTML={{ 
          __html: `
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .animate-spin-slow {
              animation: spin-slow 8s linear infinite;
            }
          ` 
        }} 
      />
    </div>
  );
}