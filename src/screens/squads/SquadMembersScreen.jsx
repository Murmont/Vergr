import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function SquadMembersScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const members = [
    { username:'NeonBlade', displayName:'Alex Storm', role:'Leader', tier:'Gold', online:true },
    { username:'PixelQueen', displayName:'Sarah Chen', role:'Officer', tier:'Diamond', online:true },
    { username:'FragMaster', displayName:'Jake Torres', role:'Officer', tier:'Silver', online:false },
    { username:'LootGoblin', displayName:'Maya Kim', role:'Veteran', tier:'Platinum', online:true },
    { username:'ShadowFox', displayName:'Rio Tanaka', role:'Member', tier:'Gold', online:false },
    { username:'ArcticWolf', displayName:'Erik Lindström', role:'Member', tier:'Bronze', online:true },
  ];
  const roleColors = { Leader:'#FFD700', Officer:'#51fbd9', Veteran:'#7B6FFF', Member:'#6B7280' };
  const filtered = members.filter(m=>m.displayName.toLowerCase().includes(search.toLowerCase())||m.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg flex-1">Members ({members.length})</h1>
        <button onClick={()=>navigate('invite')} className="text-primary"><Icon name="user-plus" size={22}/></button>
      </header>
      <div className="px-5 mb-4">
        <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-border">
          <Icon name="search" size={18} className="text-text-secondary mr-2"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 bg-transparent text-white text-sm outline-none" placeholder="Search members..."/>
        </div>
      </div>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {filtered.map(m=>(
          <button key={m.username} onClick={()=>navigate(`/user/${m.username}`)} className="flex items-center gap-3 w-full py-3 border-b border-surface-border/30">
            <div className="relative"><UserAvatar username={m.username} tier={m.tier} size={44}/>{m.online&&<div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-bg-dark"/>}</div>
            <div className="flex-1 text-left"><p className="text-white font-semibold text-sm">{m.displayName}</p><p className="text-text-secondary text-xs">@{m.username}</p></div>
            <span className="text-xs font-bold px-2 py-1 rounded-full" style={{color:roleColors[m.role],backgroundColor:roleColors[m.role]+'20'}}>{m.role}</span>
          </button>
        ))}
      </main>
    </div>
  );
}
