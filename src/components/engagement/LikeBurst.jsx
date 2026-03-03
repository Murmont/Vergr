import { motion, AnimatePresence } from 'framer-motion';

export default function LikeBurst({ trigger = false }) {
  return (
    <AnimatePresence>
      {trigger && (
        <>
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 rounded-full border-2 border-red-400 pointer-events-none"
          />
          {[0, 60, 120, 180, 240, 300].map(deg => (
            <motion.div
              key={deg}
              initial={{ opacity: 1, scale: 0.5, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 0,
                x: Math.cos((deg * Math.PI) / 180) * 20,
                y: Math.sin((deg * Math.PI) / 180) * 20,
              }}
              transition={{ duration: 0.4 }}
              className="absolute w-1.5 h-1.5 rounded-full bg-red-400 pointer-events-none"
              style={{ left: '50%', top: '50%' }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  );
}
