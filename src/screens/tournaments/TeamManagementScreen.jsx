import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';
export default function TeamManagementScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('roster');
  const roster = [
    { username:'NeonBlade', role:'Captain', tier:'Gold', status:'active' },
    { username:'PixelQueen', role:'Duelist', tier:'Diamond', status:'active' },
    { username:'FragMaster', role:'Sentinel', tier:'Silver', status:'benched' },
    { username:'ShadowFox', role:'Controller', tier:'Gold', status:'active' },
    { username:'ArcticWolf', role:'Sub', tier:'Bronze', status:'active' },
  ];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg flex-1">Team Management</h1><button className="text-primary"><Icon name="user-plus" size={20}/></button></header>
      <div className="flex gap-2 px-5 mb-4">{['roster','schedule','stats'].map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-full text-sm font-bold ${tab===t?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}</div>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {tab==='roster'&&roster.map(m=>(
          <div key={m.username} className="flex items-center gap-3 py-3 border-b border-surface-border/30">
            <UserAvatar username={m.username} tier={m.tier} size={44}/>
            <div className="flex-1"><p className="text-white font-semibold text-sm">@{m.username}</p><p className="text-text-secondary text-xs">{m.role}</p></div>
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${m.status==='active'?'bg-green-500/20 text-green-400':'bg-yellow-500/20 text-yellow-400'}`}>{m.status}</span>
          </div>))}
        {tab==='schedule'&&<div className="text-center py-12"><Icon name="calendar" size={40} className="text-text-secondary mx-auto mb-4"/><p className="text-text-secondary">No upcoming matches scheduled</p><button className="btn-primary px-6 py-2 rounded-xl font-bold text-sm mt-4">Schedule Match</button></div>}
        {tab==='stats'&&<div className="grid grid-cols-2 gap-3">{[{l:'Win Rate',v:'78%'},{l:'Matches',v:'110'},{l:'Win Streak',v:'5'},{l:'Avg Score',v:'13.2'}].map(s=>(
          <div key={s.l} className="bg-surface rounded-xl p-4 text-center border border-surface-border"><p className="text-white text-xl font-bold">{s.v}</p><p className="text-text-secondary text-xs">{s.l}</p></div>))}</div>}
      </main>
    </div>);
}
