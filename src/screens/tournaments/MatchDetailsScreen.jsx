import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function MatchDetailsScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Match Details</h1></header>
      <main className="flex-1 px-5 pb-8">
        <div className="bg-surface rounded-xl p-6 border border-surface-border mb-6">
          <div className="flex items-center justify-between mb-4"><div className="text-center"><p className="text-white text-2xl font-bold">Team Nexus</p><p className="text-text-secondary text-xs">[NXS]</p></div><div className="text-center"><p className="text-primary text-3xl font-bold font-mono">13 - 7</p><p className="text-text-secondary text-xs">Final</p></div><div className="text-center"><p className="text-white text-2xl font-bold">Valo Gang</p><p className="text-text-secondary text-xs">[VLG]</p></div></div>
          <div className="flex justify-center gap-4 text-text-secondary text-xs"><span>Valorant</span><span>·</span><span>Bo1</span><span>·</span><span>Ascent</span></div>
        </div>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Round History</p>
        <div className="flex gap-1 flex-wrap mb-6">{Array.from({length:20}).map((_,i)=>(<div key={i} className={`w-6 h-6 rounded text-[10px] font-bold flex items-center justify-center ${i<13?'bg-green-500/20 text-green-400':'bg-red-500/20 text-red-400'}`}>{i+1}</div>))}</div>
        <button onClick={()=>navigate('rosters')} className="w-full py-3 bg-surface border border-surface-border rounded-xl text-white font-semibold text-sm text-center">View Rosters</button>
      </main>
    </div>);
}
