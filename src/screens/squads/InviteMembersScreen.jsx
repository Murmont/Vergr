import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';
import { useUI } from '../../context/UIContext';

export default function InviteMembersScreen() {
  const navigate = useNavigate();
  const { showToast } = useUI();
  const [search, setSearch] = useState('');
  const [invited, setInvited] = useState({});
  const users = [
    { username:'DrDisrespect', displayName:'Dr Disrespect', tier:'Diamond' },
    { username:'Valkyrae', displayName:'Valkyrae', tier:'Diamond' },
    { username:'Shroud', displayName:'Shroud', tier:'Diamond' },
    { username:'AceuFPS', displayName:'Aceu', tier:'Gold' },
  ];

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Invite Members</h1>
      </header>
      <div className="px-5 mb-4">
        <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-border">
          <Icon name="search" size={18} className="text-text-secondary mr-2"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 bg-transparent text-white text-sm outline-none" placeholder="Search people..."/>
        </div>
      </div>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {users.map(u=>(
          <div key={u.username} className="flex items-center gap-3 py-3 border-b border-surface-border/30">
            <UserAvatar username={u.username} tier={u.tier} size={44}/>
            <div className="flex-1"><p className="text-white font-semibold text-sm">{u.displayName}</p><p className="text-text-secondary text-xs">@{u.username}</p></div>
            <button onClick={()=>{setInvited(p=>({...p,[u.username]:true}));showToast(`Invited @${u.username}`,'success');}}
              className={`px-4 py-1.5 rounded-full text-xs font-bold ${invited[u.username]?'bg-surface text-text-secondary':'bg-primary text-black'}`}>
              {invited[u.username]?'Invited':'Invite'}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
