import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function TrendingHashtagsScreen() {
  const navigate = useNavigate();
  const tags = [{tag:'valorant',posts:'12.4K',trend:'+24%'},{tag:'eldenring',posts:'8.9K',trend:'+18%'},{tag:'esports',posts:'7.2K',trend:'+12%'},{tag:'streaming',posts:'6.5K',trend:'+8%'},{tag:'gamedev',posts:'4.1K',trend:'+32%'},{tag:'speedrun',posts:'3.8K',trend:'+15%'},{tag:'retrogaming',posts:'2.9K',trend:'+6%'}];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Trending</h1></header>
      <main className="flex-1 px-5 pb-8">{tags.map((t,i)=>(
        <button key={t.tag} className="flex items-center gap-3 w-full py-4 border-b border-surface-border/30">
          <span className="text-text-secondary font-bold w-6">{i+1}</span>
          <div className="flex-1 text-left"><p className="text-white font-semibold">#{t.tag}</p><p className="text-text-secondary text-xs">{t.posts} posts</p></div>
          <span className="text-green-400 text-xs font-bold">{t.trend}</span>
        </button>))}</main>
    </div>);
}
