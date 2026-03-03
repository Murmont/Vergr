import { useState } from 'react';
import TopBar from '../../components/TopBar';
import CoinDisplay from '../../components/CoinDisplay';
import Icon from '../../components/Icon';

const TOURNAMENTS = [
  {
    id: 't1', name: 'Valorant Weekly Showdown', game: 'Valorant', status: 'live',
    teams: 16, prizePool: 5000, entryFee: 50, startDate: 'Live Now',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
  },
  {
    id: 't2', name: 'Apex Legends Championship', game: 'Apex Legends', status: 'upcoming',
    teams: 32, prizePool: 10000, entryFee: 100, startDate: 'Tomorrow, 8PM EST',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400',
  },
  {
    id: 't3', name: 'Fortnite Friday', game: 'Fortnite', status: 'upcoming',
    teams: 64, prizePool: 2500, entryFee: 25, startDate: 'Friday, 6PM EST',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
  },
  {
    id: 't4', name: 'CS2 Pro League', game: 'CS2', status: 'completed',
    teams: 8, prizePool: 25000, entryFee: 200, startDate: 'Completed',
    winner: 'Team Liquid',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=400',
  },
];

export default function TournamentScreen() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? TOURNAMENTS : TOURNAMENTS.filter(t => t.status === filter);

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Tournaments" showBack actions={
        <button className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center">
          <Icon name="history" size={20} />
        </button>
      } />

      {/* Filters */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        {[
          { key: 'all', label: 'All' },
          { key: 'live', label: '🔴 Live' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'completed', label: 'Completed' },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              filter === f.key ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Tournament cards */}
      <div className="px-4 space-y-4">
        {filtered.map(tournament => (
          <div key={tournament.id} className="rounded-2xl border border-border-accent bg-surface-1 overflow-hidden">
            {/* Image */}
            <div className="relative h-36">
              <img src={tournament.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-transparent to-transparent" />
              {tournament.status === 'live' && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-brand-ember px-2.5 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-white text-[10px] font-bold uppercase">LIVE</span>
                </div>
              )}
              <div className="absolute bottom-3 left-3">
                <h3 className="font-syne font-bold text-lg text-white">{tournament.name}</h3>
                <p className="text-white/70 text-xs">{tournament.game}</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-text-muted text-[10px] uppercase">Prize Pool</p>
                  <p className="font-dmmono text-brand-gold font-bold text-sm">● {tournament.prizePool.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-text-muted text-[10px] uppercase">Teams</p>
                  <p className="font-dmmono text-text-primary font-bold text-sm">{tournament.teams}</p>
                </div>
                <div className="text-center">
                  <p className="text-text-muted text-[10px] uppercase">Entry</p>
                  <p className="font-dmmono text-brand-cyan font-bold text-sm">● {tournament.entryFee}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="schedule" size={16} className="text-text-muted" />
                  <span className="text-text-secondary text-sm">{tournament.startDate}</span>
                </div>
                {tournament.status === 'upcoming' && (
                  <button className="px-5 py-2 rounded-full bg-brand-gradient text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all">
                    Join
                  </button>
                )}
                {tournament.status === 'live' && (
                  <button className="px-5 py-2 rounded-full bg-brand-ember text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all">
                    Watch
                  </button>
                )}
                {tournament.status === 'completed' && (
                  <span className="text-text-muted text-sm">Winner: <span className="text-brand-gold font-semibold">{tournament.winner}</span></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
