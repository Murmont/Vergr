import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import UserAvatar from '../../components/UserAvatar';

export default function SquadPinnedScreen() {
  const navigate = useNavigate();
  const pinned = [
    { id:1, author:{ username:'NeonBlade', tier:'Gold' }, content:'Squad tournament this Saturday at 8PM EST. Everyone be online!', pinnedBy:'NeonBlade', time:'2 days ago' },
    { id:2, author:{ username:'PixelQueen', tier:'Diamond' }, content:'New squad rules: Be respectful, no toxic behavior, and have fun! Full rules in the doc linked below.', pinnedBy:'NeonBlade', time:'1 week ago' },
    { id:3, author:{ username:'FragMaster', tier:'Silver' }, content:'Strategy guide for ranked is now in the files section. Check it out before scrims.', pinnedBy:'PixelQueen', time:'2 weeks ago' },
  ];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button>
        <h1 className="text-white font-syne font-bold text-lg">Pinned Messages ({pinned.length})</h1>
      </header>
      <main className="flex-1 px-5 pb-8 overflow-y-auto">
        {pinned.map(p=>(
          <div key={p.id} className="bg-surface rounded-xl p-4 mb-3 border-l-2 border-primary">
            <div className="flex items-center gap-2 mb-2">
              <UserAvatar username={p.author.username} tier={p.author.tier} size={28}/>
              <span className="text-white text-sm font-semibold">@{p.author.username}</span>
              <span className="text-text-secondary text-xs ml-auto">{p.time}</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-2">{p.content}</p>
            <p className="text-text-secondary text-xs flex items-center gap-1"><Icon name="pin" size={12}/>Pinned by @{p.pinnedBy}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
