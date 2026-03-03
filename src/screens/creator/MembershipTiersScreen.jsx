import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function MembershipTiersScreen() {
  const navigate = useNavigate();
  const [tiers, setTiers] = useState([
    {id:1,name:'Supporter',price:50,perks:['Ad-free streams','Supporter badge','Exclusive emotes']},
    {id:2,name:'VIP',price:150,perks:['All Supporter perks','Priority in chat','Monthly exclusive content','Behind-the-scenes access']},
    {id:3,name:'Legend',price:500,perks:['All VIP perks','1-on-1 gaming sessions','Custom shoutouts','Discord role']},
  ]);
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Membership Tiers</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <p className="text-text-secondary text-sm mb-6">Create tiers for your subscribers. Each tier unlocks exclusive perks and content.</p>
        {tiers.map(t=>(
          <div key={t.id} className="bg-surface rounded-xl p-5 mb-4 border border-surface-border">
            <div className="flex items-center justify-between mb-3"><h3 className="text-white text-lg font-bold">{t.name}</h3><div className="flex items-center gap-1"><Icon name="coins" size={14} className="text-primary"/><span className="text-primary font-bold">{t.price}/mo</span></div></div>
            {t.perks.map(p=><div key={p} className="flex items-center gap-2 py-1"><Icon name="check" size={14} className="text-primary"/><span className="text-text-secondary text-sm">{p}</span></div>)}
          </div>))}
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-surface-border text-primary font-semibold"><Icon name="plus" size={18}/>Add Tier</button>
      </main>
    </div>);
}
