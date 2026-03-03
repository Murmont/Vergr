import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function TournamentPrizePoolScreen() {
  const navigate = useNavigate();
  const prizes = [{place:'1st',amount:'10,000',color:'#FFD700'},{place:'2nd',amount:'5,000',color:'#C0C0C0'},{place:'3rd',amount:'2,500',color:'#CD7F32'},{place:'4th',amount:'1,000',color:'#6B7280'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Prize Pool</h1></header>
      <main className="flex-1 px-5 pb-8">
        <div className="text-center mb-8"><p className="text-text-secondary text-sm">Total Prize Pool</p><p className="text-primary text-4xl font-bold font-syne">18,500</p><p className="text-text-secondary text-sm">coins</p></div>
        {prizes.map(p=>(
          <div key={p.place} className="flex items-center gap-4 bg-surface rounded-xl p-4 mb-3 border border-surface-border">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor:p.color+'20'}}><Icon name="trophy" size={22} style={{color:p.color}}/></div>
            <div className="flex-1"><p className="text-white font-bold">{p.place} Place</p></div>
            <div className="flex items-center gap-1"><Icon name="coins" size={14} className="text-primary"/><span className="text-primary font-bold">{p.amount}</span></div>
          </div>))}
      </main>
    </div>);
}
