import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function SquadJoinRequestsScreen() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([
    { username:'GhostSniper', displayName:'Kai Yamada', tier:'Gold', message:'Love to join! I play Valorant daily.', time:'2h ago' },
    { username:'StarDust99', displayName:'Priya Sharma', tier:'Silver', message:'Looking for a competitive squad!', time:'5h ago' },
    { username:'BlazeFury', displayName:'Marcus Johnson', tier:'Platinum', message:'', time:'1d ago' },
  ]);
  const handle = (username, action) => setRequests(p=>p.filter(r=>r.username!==username));

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Join Requests ({requests.length})</h1>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {requests.length===0?<div className="flex flex-col items-center justify-center flex-1 py-20"><Icon name="inbox" size={40} className="text-text-secondary mb-4"/><p className="text-text-secondary">No pending requests</p></div>:
        requests.map(r=>(
          <div key={r.username} className="bg-surface rounded-xl p-4 mb-3 border border-surface-border">
            <div className="flex items-center gap-3 mb-3">
              <UserAvatar username={r.username} tier={r.tier} size={44}/>
              <div className="flex-1"><p className="text-white font-semibold">{r.displayName}</p><p className="text-text-secondary text-xs">@{r.username} · {r.time}</p></div>
            </div>
            {r.message&&<p className="text-white/80 text-sm bg-surface-border/50 rounded-lg p-3 mb-3">{r.message}</p>}
            <div className="flex gap-2">
              <button onClick={()=>handle(r.username,'accept')} className="flex-1 py-2 rounded-xl bg-primary text-black font-bold text-sm">Accept</button>
              <button onClick={()=>handle(r.username,'reject')} className="flex-1 py-2 rounded-xl bg-surface-border text-text-secondary font-bold text-sm">Decline</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
