import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function NewMessageScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const recents = [
    { username:'PixelQueen', displayName:'Sarah Chen', tier:'Diamond', online:true },
    { username:'FragMaster', displayName:'Jake Torres', tier:'Silver', online:false },
    { username:'LootGoblin', displayName:'Maya Kim', tier:'Platinum', online:true },
  ];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg flex-1">New Message</h1>
        <button onClick={()=>navigate('/messages/create-group')} className="text-primary text-sm font-semibold">Group</button>
      </header>
      <div className="px-5 mb-4">
        <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-border">
          <span className="text-text-secondary text-sm mr-2">To:</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 bg-transparent text-white text-sm outline-none" placeholder="Search people..."/>
        </div>
      </div>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Recent</p>
        {recents.map(r=>(
          <button key={r.username} onClick={()=>navigate(`/messages/${r.username}`)} className="flex items-center gap-3 w-full py-3 border-b border-surface-border/30">
            <div className="relative"><UserAvatar username={r.username} tier={r.tier} size={44}/>{r.online&&<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-bg-dark"/>}</div>
            <div className="flex-1 text-left"><p className="text-white font-semibold text-sm">{r.displayName}</p><p className="text-text-secondary text-xs">@{r.username}</p></div>
          </button>
        ))}
      </main>
    </div>
  );
}
