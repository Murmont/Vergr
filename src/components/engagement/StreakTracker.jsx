import { motion } from 'framer-motion';

export default function StreakTracker({ currentStreak = 0, weekDays = [] }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const defaultWeek = days.map((d, i) => ({ day: d, completed: i < currentStreak % 7 }));
  const week = weekDays.length ? weekDays : defaultWeek;

  return (
    <div className="bg-surface rounded-2xl p-4 border border-surface-border">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-text-secondary text-xs font-bold uppercase tracking-wider">Daily Streak</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl">🔥</span>
            <span className="text-white text-2xl font-bold font-mono">{currentStreak}</span>
            <span className="text-text-secondary text-sm">days</span>
          </div>
        </div>
        {currentStreak >= 7 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 bg-yellow-400/10 rounded-full"
          >
            <span className="text-yellow-400 text-xs font-bold">🏆 On Fire!</span>
          </motion.div>
        )}
      </div>
      <div className="flex gap-2">
        {week.map((d, i) => (
          <motion.div
            key={i}
            initial={d.completed ? { scale: 0 } : {}}
            animate={d.completed ? { scale: 1 } : {}}
            transition={{ delay: i * 0.08, type: 'spring', stiffness: 400 }}
            className="flex-1 flex flex-col items-center gap-1.5"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              d.completed
                ? 'bg-primary text-black shadow-lg shadow-primary/20'
                : 'bg-surface-border/50 text-text-secondary'
            }`}>
              {d.completed ? '✓' : d.day}
            </div>
            <span className="text-[10px] text-text-secondary">{d.day}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
