import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';
export default function EsportsTeamScreen() {
  const navigate = useNavigate();
  const team = {name:'Team Nexus',tag:'NXS',game:'Valorant',rank:'#12 Global',wins:87,losses:23,members:[
    {username:'NeonBlade',role:'IGL',tier:'Gold'},{username:'PixelQueen',role:'Duelist',tier:'Diamond'},{username:'FragMaster',role:'Sentinel',tier:'Silver'},{username:'ShadowFox',role:'Controller',tier:'Gold'},{username:'ArcticWolf',role:'Initiator',tier:'Bronze'},
  ]};
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Team Profile</h1></header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        <div className="text-center mb-6"><div className="w-20 h-20 rounded-2xl bg-surface-border mx-auto flex items-center justify-center text-3xl mb-3">⚔️</div>
          <h2 className="text-white text-2xl font-bold">{team.name}</h2><p className="text-primary font-mono">[{team.tag}]</p>
          <p className="text-text-secondary text-sm mt-1">{team.game} · {team.rank}</p></div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-surface rounded-xl p-4 text-center border border-surface-border"><p className="text-green-400 text-2xl font-bold">{team.wins}</p><p className="text-text-secondary text-xs">Wins</p></div>
          <div className="bg-surface rounded-xl p-4 text-center border border-surface-border"><p className="text-red-400 text-2xl font-bold">{team.losses}</p><p className="text-text-secondary text-xs">Losses</p></div>
        </div>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Roster</p>
        {team.members.map(m=>(
          <button key={m.username} onClick={()=>navigate(`/user/${m.username}`)} className="flex items-center gap-3 w-full py-3 border-b border-surface-border/30">
            <UserAvatar username={m.username} tier={m.tier} size={40}/>
            <div className="flex-1 text-left"><p className="text-white font-semibold text-sm">@{m.username}</p><p className="text-text-secondary text-xs">{m.role}</p></div>
          </button>))}
      </main>
    </div>);
}
