import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';

export default function SquadChallengesScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('active');
  const challenges = [
    { id:1, title:'Weekend Warrior', desc:'Play 10 matches this weekend', reward:200, progress:6, target:10, status:'active', endsIn:'2d 5h' },
    { id:2, title:'Squad Streak', desc:'Win 5 matches in a row as a squad', reward:500, progress:3, target:5, status:'active', endsIn:'4d 12h' },
    { id:3, title:'Content King', desc:'Post 3 highlight clips', reward:150, progress:3, target:3, status:'completed', endsIn:null },
  ];
  const filtered = challenges.filter(c=>tab==='all'||c.status===tab);
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Squad Challenges</h1>
      </header>
      <div className="flex gap-2 px-5 mb-4">
        {['active','completed','all'].map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-full text-sm font-bold ${tab===t?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
      </div>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {filtered.map(c=>(
          <div key={c.id} className="bg-surface rounded-xl p-4 mb-3 border border-surface-border">
            <div className="flex items-start justify-between mb-2">
              <div><h3 className="text-white font-bold">{c.title}</h3><p className="text-text-secondary text-xs">{c.desc}</p></div>
              <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full"><Icon name="coins" size={12} className="text-primary"/><span className="text-primary text-xs font-bold">{c.reward}</span></div>
            </div>
            <div className="h-2 bg-surface-border rounded-full overflow-hidden mb-2">
              <div className={`h-full rounded-full ${c.status==='completed'?'bg-green-500':'bg-primary'}`} style={{width:`${(c.progress/c.target)*100}%`}}/>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-secondary">{c.progress}/{c.target}</span>
              {c.endsIn?<span className="text-text-secondary">Ends in {c.endsIn}</span>:<span className="text-green-400 font-bold">Completed ✓</span>}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
