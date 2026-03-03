import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';
export default function BrowseCreatorsScreen() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const creators = [
    {username:'PixelQueen',displayName:'Sarah Chen',tier:'Diamond',bio:'Variety streamer & content creator ✨',followers:'38K',games:['Elden Ring','Valorant']},
    {username:'FragMaster',displayName:'Jake Torres',tier:'Silver',bio:'FPS grinder | Tournament competitor',followers:'5.2K',games:['Apex Legends','CS2']},
    {username:'LootGoblin',displayName:'Maya Kim',tier:'Platinum',bio:'RPG enthusiast | Speedrunner',followers:'12K',games:['Hollow Knight','Celeste']},
  ];
  const c = creators[idx];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Discover Creators</h1></header>
      <main className="flex-1 px-5 pb-8 flex flex-col items-center justify-center">
        <div className="bg-surface rounded-2xl p-6 w-full max-w-[360px] border border-surface-border text-center">
          <UserAvatar username={c.username} tier={c.tier} size={80}/>
          <h2 className="text-white text-xl font-bold mt-4">{c.displayName}</h2>
          <p className="text-primary text-sm">@{c.username}</p>
          <p className="text-text-secondary text-sm mt-2 mb-4">{c.bio}</p>
          <p className="text-text-secondary text-xs mb-4">{c.followers} followers · {c.games.join(', ')}</p>
          <div className="flex gap-3">
            <button onClick={()=>setIdx(p=>(p+1)%creators.length)} className="flex-1 py-3 bg-surface-border rounded-xl text-text-secondary font-bold text-sm">Skip</button>
            <button onClick={()=>navigate(`/user/${c.username}`)} className="flex-1 py-3 bg-primary rounded-xl text-black font-bold text-sm">Follow</button>
          </div>
        </div>
      </main>
    </div>);
}
