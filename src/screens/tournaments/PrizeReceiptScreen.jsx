import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function PrizeReceiptScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Prize Receipt</h1></header>
      <main className="flex-1 px-5 pb-8">
        <div className="bg-surface rounded-2xl p-6 border border-surface-border text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-white text-xl font-bold mb-1">1st Place — Weekend Clash</h2>
          <p className="text-text-secondary text-sm mb-6">Valorant 5v5 Tournament</p>
          <div className="flex items-center justify-center gap-2 mb-6"><Icon name="coins" size={24} className="text-yellow-400"/><span className="text-yellow-400 text-4xl font-bold font-mono">10,000</span></div>
          <div className="border-t border-surface-border pt-4 flex flex-col gap-3 text-left">
            {[['Tournament','Weekend Clash S4'],['Team','Team Nexus'],['Placement','1st of 16'],['Date','Mar 2, 2026'],['Status','Credited to wallet']].map(([l,v])=>(
              <div key={l} className="flex justify-between"><span className="text-text-secondary text-sm">{l}</span><span className="text-white text-sm font-semibold">{v}</span></div>))}
          </div>
        </div>
      </main>
    </div>);
}
