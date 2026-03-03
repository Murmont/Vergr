import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function PrestigeLevelsScreen() {
  const navigate = useNavigate();
  const tiers = [
    {name:'Bronze',coins:0,color:'#CD7F32',perks:['Basic profile','Join squads']},
    {name:'Silver',coins:500,color:'#C0C0C0',perks:['Custom avatar ring','Create polls']},
    {name:'Gold',coins:2000,color:'#FFD700',perks:['Gold badge','Priority matchmaking']},
    {name:'Platinum',coins:5000,color:'#E5E4E2',perks:['Platinum effects','Creator tools access']},
    {name:'Diamond',coins:15000,color:'#B9F2FF',perks:['Holographic avatar','Exclusive shop items','VIP support']},
  ];
  const current = 2;
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Prestige Levels</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">{tiers.map((t,i)=>(
        <div key={t.name} className={`bg-surface rounded-xl p-4 mb-3 border ${i===current?'border-primary ring-1 ring-primary/30':'border-surface-border'} ${i>current?'opacity-50':''}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor:t.color+'20'}}><Icon name="award" size={20} style={{color:t.color}}/></div>
            <div className="flex-1"><h3 className="text-white font-bold">{t.name}</h3><p className="text-text-secondary text-xs">{t.coins.toLocaleString()} coins to unlock</p></div>
            {i<current&&<span className="text-green-400 text-xs font-bold">Unlocked</span>}
            {i===current&&<span className="text-primary text-xs font-bold">Current</span>}
          </div>
          {t.perks.map(p=><div key={p} className="flex items-center gap-2 py-0.5 ml-13"><Icon name="check" size={12} className={i<=current?'text-primary':'text-text-secondary/30'}/><span className="text-text-secondary text-xs">{p}</span></div>)}
        </div>))}</main>
    </div>);
}
