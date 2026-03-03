import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoinBurst({ amount = 0, trigger = false, onComplete }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (!trigger || amount <= 0) return;
    const count = Math.min(amount > 100 ? 12 : amount > 20 ? 8 : 5, 15);
    const newCoins = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: -(Math.random() * 150 + 80),
      rotate: Math.random() * 360,
      scale: 0.6 + Math.random() * 0.6,
      delay: Math.random() * 0.3,
    }));
    setCoins(newCoins);
    const timer = setTimeout(() => { setCoins([]); onComplete?.(); }, 1500);
    return () => clearTimeout(timer);
  }, [trigger, amount]);

  return (
    <AnimatePresence>
      {coins.map(c => (
        <motion.div
          key={c.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 0, x: c.x, y: c.y, scale: c.scale, rotate: c.rotate }}
          transition={{ duration: 1.2, delay: c.delay, ease: 'easeOut' }}
          className="fixed pointer-events-none z-50"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="w-6 h-6 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/30 flex items-center justify-center text-[10px] font-bold text-yellow-900">$</div>
        </motion.div>
      ))}
      {trigger && amount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className="text-yellow-400 text-4xl font-bold font-mono drop-shadow-lg">+{amount}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
