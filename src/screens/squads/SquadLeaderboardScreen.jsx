import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function SquadLeaderboardScreen() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('weekly');
  const leaders = [
    { rank:1, username:'NeonBlade', tier:'Gold', points:2840, wins:12 },
    { rank:2, username:'PixelQueen', tier:'Diamond', points:2560, wins:10 },
    { rank:3, username:'FragMaster', tier:'Silver', points:2100, wins:8 },
    { rank:4, username:'LootGoblin', tier:'Platinum', points:1890, wins:7 },
    { rank:5, username:'ShadowFox', tier:'Gold', points:1650, wins:6 },
  ];
  const podiumColors = ['#FFD700','#C0C0C0','#CD7F32'];

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Squad Leaderboard</h1>
      </header>
      <div className="flex gap-2 px-5 mb-6">
        {['weekly','monthly','alltime'].map(t=><button key={t} onClick={()=>setPeriod(t)} className={`px-4 py-2 rounded-full text-sm font-bold ${period===t?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{t==='alltime'?'All Time':t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
      </div>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {leaders.map(l=>(
          <div key={l.rank} className={`flex items-center gap-3 py-3 ${l.rank<=3?'':'border-b border-surface-border/30'}`}>
            <span className="w-8 text-center font-bold" style={{color:l.rank<=3?podiumColors[l.rank-1]:'#6B7280'}}>{l.rank}</span>
            <UserAvatar username={l.username} tier={l.tier} size={40}/>
            <div className="flex-1"><p className="text-white font-semibold text-sm">@{l.username}</p><p className="text-text-secondary text-xs">{l.wins} wins</p></div>
            <span className="text-primary font-bold">{l.points.toLocaleString()}</span>
          </div>
        ))}
      </main>
    </div>
  );
}
