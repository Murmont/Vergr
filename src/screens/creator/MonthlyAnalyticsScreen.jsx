import { useState } from 'react';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

const BarChart = ({ data, color = '#4DFFD4', maxVal }) => {
  const max = maxVal || Math.max(...data.map(d => d.value));
  return (
    <div className="flex items-end gap-1 h-32">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-sm transition-all" style={{ height: `${(d.value / max) * 100}%`, background: color, minHeight: 2 }} />
          <span className="text-[8px] text-text-muted font-dmmono">{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const MONTHLY_DATA = {
  revenue: [
    { label: 'W1', value: 1200 }, { label: 'W2', value: 1850 }, { label: 'W3', value: 1400 }, { label: 'W4', value: 2100 },
  ],
  views: [
    { label: '1', value: 800 }, { label: '5', value: 1200 }, { label: '10', value: 950 }, { label: '15', value: 1800 },
    { label: '20', value: 2200 }, { label: '25', value: 1900 }, { label: '30', value: 2500 },
  ],
  topContent: [
    { title: 'Stream: Elden Ring DLC Run', type: 'stream', views: '45.2K', revenue: 850 },
    { title: 'Best Settings Guide 2024', type: 'post', views: '32.1K', revenue: 420 },
    { title: 'Tournament Highlights', type: 'clip', views: '28.7K', revenue: 310 },
  ],
  demographics: [
    { label: '18-24', pct: 42 }, { label: '25-34', pct: 31 }, { label: '35-44', pct: 18 }, { label: '45+', pct: 9 },
  ],
};

export default function MonthlyAnalyticsScreen() {
  const [month, setMonth] = useState('Oct 2026');

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Monthly Analytics" showBack actions={
        <button className="p-2"><Icon name="ios_share" size={20} className="text-text-secondary" /></button>
      } />

      {/* Date picker */}
      <div className="flex justify-center py-3">
        <button className="flex items-center gap-2 bg-surface-2 px-4 py-2 rounded-full border border-border-accent">
          <Icon name="calendar_month" size={16} className="text-text-secondary" />
          <span className="text-sm font-medium">{month}</span>
          <Icon name="expand_more" size={16} className="text-text-muted" />
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 px-4 mb-6">
        {[
          { label: 'Total Revenue', value: '●6,550', color: 'text-brand-gold', change: '+18%' },
          { label: 'New Followers', value: '+2,840', color: 'text-brand-cyan', change: '+24%' },
          { label: 'Engagement', value: '8.4%', color: 'text-brand-pink', change: '+1.6%' },
        ].map(stat => (
          <div key={stat.label} className="p-3 rounded-2xl bg-surface-1 border border-border-accent">
            <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">{stat.label}</p>
            <p className={`font-dmmono text-lg font-bold ${stat.color}`}>{stat.value}</p>
            <span className="text-green-500 text-xs font-dmmono">{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="px-4 mb-6">
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-accent">
          <h3 className="font-syne font-bold text-sm mb-4">Weekly Revenue</h3>
          <BarChart data={MONTHLY_DATA.revenue} color="#F5C542" />
        </div>
      </div>

      {/* Views chart */}
      <div className="px-4 mb-6">
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-accent">
          <h3 className="font-syne font-bold text-sm mb-4">Daily Views</h3>
          <BarChart data={MONTHLY_DATA.views} color="#7B6FFF" />
        </div>
      </div>

      {/* Top content */}
      <div className="px-4 mb-6">
        <h3 className="font-syne font-bold text-sm mb-3">Top Performing Content</h3>
        <div className="space-y-2">
          {MONTHLY_DATA.topContent.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-surface-1 border border-border-accent">
              <span className="font-dmmono text-text-muted text-sm w-6 text-center">#{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{item.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-text-muted">{item.views} views</span>
                  <span className="text-xs text-brand-gold font-dmmono">●{item.revenue}</span>
                </div>
              </div>
              <span className="badge text-[9px] bg-surface-3 text-text-muted">{item.type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audience demographics */}
      <div className="px-4 mb-6">
        <h3 className="font-syne font-bold text-sm mb-3">Audience Age</h3>
        <div className="p-4 rounded-2xl bg-surface-1 border border-border-accent space-y-3">
          {MONTHLY_DATA.demographics.map(d => (
            <div key={d.label} className="flex items-center gap-3">
              <span className="text-xs text-text-muted w-10 font-dmmono">{d.label}</span>
              <div className="flex-1 h-3 bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-brand-gradient rounded-full transition-all" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="text-xs text-text-secondary font-dmmono w-8 text-right">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
