import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';
export default function TeamFundingScreen() {
  const navigate = useNavigate();
  const goal = 10000; const raised = 7250;
  const contributors = [
    { username:'PixelQueen', tier:'Diamond', amount:2000 },
    { username:'LootGoblin', tier:'Platinum', amount:1500 },
    { username:'FragMaster', tier:'Silver', amount:1000 },
    { username:'ShadowFox', tier:'Gold', amount:750 },
  ];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Team Funding</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="bg-surface rounded-2xl p-6 border border-surface-border mb-6 text-center">
          <p className="text-text-secondary text-sm mb-2">Tournament Entry Fund</p>
          <p className="text-primary text-3xl font-bold">{raised.toLocaleString()} <span className="text-lg text-text-secondary">/ {goal.toLocaleString()}</span></p>
          <div className="h-3 bg-surface-border rounded-full overflow-hidden mt-4 mb-2"><div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full" style={{width:`${(raised/goal)*100}%`}}/></div>
          <p className="text-text-secondary text-xs">{Math.round((raised/goal)*100)}% funded · {contributors.length} contributors</p>
        </div>
        <button onClick={()=>navigate('/team-contribute')} className="btn-primary w-full py-4 rounded-2xl text-lg font-bold mb-6">Contribute</button>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Top Contributors</p>
        {contributors.map((c,i)=>(
          <div key={c.username} className="flex items-center gap-3 py-3 border-b border-surface-border/30">
            <span className="text-text-secondary font-bold w-6">{i+1}</span>
            <UserAvatar username={c.username} tier={c.tier} size={40}/>
            <span className="flex-1 text-white font-semibold text-sm">@{c.username}</span>
            <div className="flex items-center gap-1"><Icon name="coins" size={14} className="text-primary"/><span className="text-primary font-bold text-sm">{c.amount.toLocaleString()}</span></div>
          </div>))}
      </main>
    </div>);
}
