import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function MessageRequestsScreen() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    { id:1, username:'GhostSniper', tier:'Gold', preview:'Hey, wanna squad up?', time:'2h' },
    { id:2, username:'StarDust99', tier:'Silver', preview:'Saw your stream, amazing plays!', time:'5h' },
    { id:3, username:'BlazeFury', tier:'Platinum', preview:'Are you joining the tournament?', time:'1d' },
  ]);
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Message Requests ({requests.length})</h1>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {requests.map(r=>(
          <div key={r.id} className="flex items-center gap-3 py-4 border-b border-surface-border/30">
            <UserAvatar username={r.username} tier={r.tier} size={48}/>
            <div className="flex-1 min-w-0"><p className="text-white font-semibold text-sm">@{r.username}</p><p className="text-text-secondary text-sm truncate">{r.preview}</p></div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-text-secondary text-xs">{r.time}</span>
              <div className="flex gap-2">
                <button onClick={()=>navigate(`/messages/${r.id}`)} className="px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">Accept</button>
                <button onClick={()=>setRequests(p=>p.filter(x=>x.id!==r.id))} className="px-3 py-1 bg-surface-border text-text-secondary text-xs font-bold rounded-full">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
