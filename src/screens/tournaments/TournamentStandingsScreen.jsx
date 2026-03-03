import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function TournamentStandingsScreen() {
  const navigate = useNavigate();
  const teams = [{rank:1,name:'Team Nexus',wins:5,losses:0,pts:15},{rank:2,name:'Apex Predators',wins:4,losses:1,pts:12},{rank:3,name:'Valo Gang',wins:3,losses:2,pts:9},{rank:4,name:'Shadow Corp',wins:2,losses:3,pts:6},{rank:5,name:'Elden Lords',wins:1,losses:4,pts:3}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Standings</h1></header>
      <main className="flex-1 px-5 pb-8">
        <div className="bg-surface rounded-xl border border-surface-border overflow-hidden">
          <div className="grid grid-cols-5 gap-2 px-4 py-3 border-b border-surface-border text-text-secondary text-xs font-bold uppercase"><span>#</span><span className="col-span-2">Team</span><span>W/L</span><span>Pts</span></div>
          {teams.map(t=>(
            <div key={t.rank} className="grid grid-cols-5 gap-2 px-4 py-3 border-b border-surface-border/30 items-center">
              <span className={`font-bold ${t.rank<=3?'text-primary':'text-text-secondary'}`}>{t.rank}</span>
              <span className="text-white font-semibold text-sm col-span-2">{t.name}</span>
              <span className="text-text-secondary text-sm">{t.wins}-{t.losses}</span>
              <span className="text-primary font-bold">{t.pts}</span>
            </div>))}
        </div>
      </main>
    </div>);
}
