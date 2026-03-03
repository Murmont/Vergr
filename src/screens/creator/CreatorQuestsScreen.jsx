import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function CreatorQuestsScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('daily');
  const quests = {daily:[
    {id:1,title:'Go Live',desc:'Stream for 30+ minutes',reward:50,progress:0,target:1},
    {id:2,title:'Engage',desc:'Reply to 10 chat messages',reward:30,progress:7,target:10},
    {id:3,title:'Content',desc:'Post a highlight clip',reward:40,progress:1,target:1,done:true},
  ],weekly:[
    {id:4,title:'Consistency',desc:'Stream 5 days this week',reward:200,progress:3,target:5},
    {id:5,title:'Grow',desc:'Gain 50 new followers',reward:150,progress:28,target:50},
  ]};
  const list = quests[tab]||[];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Creator Quests</h1></header>
      <div className="flex gap-2 px-5 mb-4">{['daily','weekly'].map(t=><button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-full text-sm font-bold ${tab===t?'bg-primary text-black':'bg-surface text-text-secondary'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>)}</div>
      <main className="flex-1 px-5 pb-8">{list.map(q=>(
        <div key={q.id} className={`bg-surface rounded-xl p-4 mb-3 border ${q.done?'border-green-500/30':'border-surface-border'}`}>
          <div className="flex items-start justify-between mb-2"><div><h3 className="text-white font-bold">{q.title}</h3><p className="text-text-secondary text-xs">{q.desc}</p></div>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full"><Icon name="coins" size={12} className="text-primary"/><span className="text-primary text-xs font-bold">{q.reward}</span></div></div>
          <div className="h-2 bg-surface-border rounded-full overflow-hidden mb-1"><div className={`h-full rounded-full ${q.done?'bg-green-500':'bg-primary'}`} style={{width:`${(q.progress/q.target)*100}%`}}/></div>
          <div className="flex justify-between text-xs"><span className="text-text-secondary">{q.progress}/{q.target}</span>{q.done&&<span className="text-green-400 font-bold">Claimed ✓</span>}</div>
        </div>))}</main>
    </div>);
}
