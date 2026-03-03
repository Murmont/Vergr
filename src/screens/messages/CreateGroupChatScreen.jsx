import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';
import { useUI } from '../../context/UIContext';

export default function CreateGroupChatScreen() {
  const navigate = useNavigate();
  const { showToast } = useUI();
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const friends = [
    { username:'PixelQueen', displayName:'Sarah Chen', tier:'Diamond' },
    { username:'FragMaster', displayName:'Jake Torres', tier:'Silver' },
    { username:'LootGoblin', displayName:'Maya Kim', tier:'Platinum' },
    { username:'ShadowFox', displayName:'Rio Tanaka', tier:'Gold' },
  ];
  const toggle = u => setSelected(p=>p.includes(u)?p.filter(x=>x!==u):[...p,u]);

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg flex-1">New Group</h1>
        <button onClick={()=>{if(selected.length<2){showToast('Select at least 2 people','error');return;}navigate('/messages/new-group');}} className="text-primary font-semibold text-sm">Create</button>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <label className="block mb-4"><span className="text-text-secondary text-xs font-bold uppercase mb-2 block">Group Name</span>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter group name..." className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 text-white outline-none focus:border-primary placeholder:text-text-secondary/50"/></label>
        {selected.length>0&&<div className="flex gap-2 overflow-x-auto mb-4 no-scrollbar">
          {selected.map(u=><div key={u} className="flex flex-col items-center gap-1 min-w-[60px]">
            <div className="relative"><UserAvatar username={u} size={40}/><button onClick={()=>toggle(u)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"><Icon name="x" size={10} className="text-white"/></button></div>
            <span className="text-text-secondary text-[10px] truncate w-[60px] text-center">@{u}</span>
          </div>)}</div>}
        <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-border mb-4">
          <Icon name="search" size={18} className="text-text-secondary mr-2"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 bg-transparent text-white text-sm outline-none" placeholder="Search friends..."/>
        </div>
        {friends.map(f=>(
          <button key={f.username} onClick={()=>toggle(f.username)} className="flex items-center gap-3 w-full py-3 border-b border-surface-border/30">
            <UserAvatar username={f.username} tier={f.tier} size={44}/>
            <div className="flex-1 text-left"><p className="text-white font-semibold text-sm">{f.displayName}</p><p className="text-text-secondary text-xs">@{f.username}</p></div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selected.includes(f.username)?'bg-primary border-primary':'border-surface-border'}`}>
              {selected.includes(f.username)&&<Icon name="check" size={12} className="text-black"/>}
            </div>
          </button>
        ))}
      </main>
    </div>
  );
}
