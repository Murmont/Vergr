import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../Icon';

export default function AchievementUnlock({ show = false, title = 'First Blood', desc = 'Win your first match', icon = '🏆', rarity = 'common', onClose }) {
  const rarityColors = {
    common: { bg: 'bg-surface', border: 'border-surface-border', glow: '' },
    rare: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
    epic: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
    legendary: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', glow: 'shadow-yellow-500/20' },
  };
  const r = rarityColors[rarity] || rarityColors.common;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`fixed top-14 left-4 right-4 z-50 ${r.bg} border ${r.border} rounded-2xl p-4 shadow-xl ${r.glow}`}
        >
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-3xl"
            >
              {icon}
            </motion.div>
            <div className="flex-1">
              <p className="text-text-secondary text-[10px] font-bold uppercase tracking-widest">Achievement Unlocked</p>
              <p className="text-white font-bold">{title}</p>
              <p className="text-text-secondary text-xs">{desc}</p>
            </div>
            <button onClick={onClose} className="text-text-secondary"><Icon name="x" size={16} /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
