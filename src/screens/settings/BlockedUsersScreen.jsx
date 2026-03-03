import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';
export default function BlockedUsersScreen() {
  const navigate = useNavigate();
  const [blocked, setBlocked] = useState([{username:'ToxicPlayer',tier:'Bronze'},{username:'SpamBot99',tier:'Bronze'}]);
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Blocked Users</h1></header>
      <main className="flex-1 px-5 pb-8">
        {blocked.length===0?<div className="flex flex-col items-center justify-center flex-1 py-20"><Icon name="shield-check" size={40} className="text-text-secondary mb-4"/><p className="text-text-secondary">No blocked users</p></div>:
        blocked.map(u=>(
          <div key={u.username} className="flex items-center gap-3 py-4 border-b border-surface-border/30">
            <UserAvatar username={u.username} tier={u.tier} size={44}/>
            <span className="flex-1 text-white font-semibold text-sm">@{u.username}</span>
            <button onClick={()=>setBlocked(p=>p.filter(x=>x.username!==u.username))} className="px-4 py-1.5 bg-surface-border text-text-secondary text-xs font-bold rounded-full">Unblock</button>
          </div>))}
      </main>
    </div>);
}
