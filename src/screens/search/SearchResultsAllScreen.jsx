import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';
import BottomNav from '../../components/BottomNav';

export default function SearchResultsAllScreen() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [tab, setTab] = useState('all');
  const navigate = useNavigate();
  const tabs = ['all','people','streams','squads','posts','tags'];
  const mockPeople = [
    { username:'PixelQueen', displayName:'Sarah Chen', tier:'Diamond', followers:'38K', isVerified:true },
    { username:'FragMaster', displayName:'Jake Torres', tier:'Silver', followers:'5.2K', isVerified:false },
  ];
  const mockStreams = [
    { title:'Ranked Grind to Radiant', streamer:'NeonBlade', game:'Valorant', viewers:1240 },
    { title:'Chill RPG Night', streamer:'PixelQueen', game:'Elden Ring', viewers:890 },
  ];
  const mockSquads = [
    { name:'Apex Predators', members:128, game:'Apex Legends' },
    { name:'Valo Gang', members:64, game:'Valorant' },
  ];

  return (
    <div className="screen-container min-h-screen flex flex-col pb-20">
      <header className="px-5 pt-12 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
          <div className="flex-1 flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-border">
            <Icon name="search" size={18} className="text-text-secondary mr-2"/>
            <input defaultValue={query} className="flex-1 bg-transparent text-white text-sm outline-none" placeholder="Search VERGR..."/>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${tab===t?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}
        </div>
      </header>
      <main className="flex-1 px-5 py-4 overflow-y-auto">
        {(tab==='all'||tab==='people')&&<div className="mb-6">{tab==='all'&&<h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">People</h3>}
          {mockPeople.map(p=><button key={p.username} onClick={()=>navigate(`/user/${p.username}`)} className="flex items-center gap-3 w-full py-3">
            <UserAvatar username={p.username} tier={p.tier} size={44}/>
            <div className="flex-1 text-left"><p className="text-white font-semibold text-sm">{p.displayName}</p><p className="text-text-secondary text-xs">@{p.username} · {p.followers}</p></div>
            <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">Follow</span>
          </button>)}</div>}
        {(tab==='all'||tab==='streams')&&<div className="mb-6">{tab==='all'&&<h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Streams</h3>}
          {mockStreams.map(s=><div key={s.title} className="flex gap-3 mb-3 p-3 bg-surface rounded-xl">
            <div className="w-24 h-16 rounded-lg bg-surface-border flex items-center justify-center relative"><Icon name="play" size={20} className="text-primary"/><span className="absolute top-1 left-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">LIVE</span></div>
            <div className="flex-1"><p className="text-white font-semibold text-sm">{s.title}</p><p className="text-text-secondary text-xs">{s.streamer} · {s.game}</p><p className="text-red-400 text-xs">{s.viewers.toLocaleString()} watching</p></div>
          </div>)}</div>}
        {(tab==='all'||tab==='squads')&&<div className="mb-6">{tab==='all'&&<h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Squads</h3>}
          {mockSquads.map(s=><div key={s.name} className="flex items-center gap-3 py-3">
            <div className="w-11 h-11 rounded-xl bg-surface-border flex items-center justify-center text-lg">🎯</div>
            <div className="flex-1"><p className="text-white font-semibold text-sm">{s.name}</p><p className="text-text-secondary text-xs">{s.members} members · {s.game}</p></div>
            <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full">Join</span>
          </div>)}</div>}
      </main>
      <BottomNav/>
    </div>
  );
}
