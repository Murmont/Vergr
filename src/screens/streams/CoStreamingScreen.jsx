import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';
export default function CoStreamingScreen() {
  const navigate = useNavigate();
  const [invited, setInvited] = useState({});
  const coStreamers = [{username:'PixelQueen',tier:'Diamond',status:'online'},{username:'FragMaster',tier:'Silver',status:'online'},{username:'LootGoblin',tier:'Platinum',status:'away'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Co-Streaming Setup</h1></header>
      <main className="flex-1 px-5 pb-8">
        <p className="text-text-secondary text-sm mb-6">Invite other creators to co-stream with you. Up to 4 streamers can go live together.</p>
        <div className="bg-surface rounded-xl p-4 border border-surface-border mb-6">
          <div className="flex items-center gap-3 mb-3"><div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center"><Icon name="layout-grid" size={28} className="text-primary"/></div><div><p className="text-white font-bold">Multi-View Layout</p><p className="text-text-secondary text-xs">Viewers see all streams side by side</p></div></div>
        </div>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Invite Co-Streamers</p>
        {coStreamers.map(c=>(
          <div key={c.username} className="flex items-center gap-3 py-3 border-b border-surface-border/30">
            <UserAvatar username={c.username} tier={c.tier} size={44}/>
            <div className="flex-1"><p className="text-white font-semibold text-sm">@{c.username}</p><p className={`text-xs ${c.status==='online'?'text-green-400':'text-yellow-400'}`}>{c.status}</p></div>
            <button onClick={()=>setInvited(p=>({...p,[c.username]:true}))} className={`px-4 py-1.5 rounded-full text-xs font-bold ${invited[c.username]?'bg-surface text-text-secondary':'bg-primary text-black'}`}>{invited[c.username]?'Invited':'Invite'}</button>
          </div>))}
        <button onClick={()=>navigate('/go-live')} className="btn-primary w-full py-4 rounded-2xl text-lg font-bold mt-8">Start Co-Stream</button>
      </main>
    </div>);
}
