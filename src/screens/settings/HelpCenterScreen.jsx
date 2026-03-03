import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
export default function HelpCenterScreen() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const faqs = [
    {q:'How do I earn coins?',a:'Earn coins by completing daily/weekly quests, watching streams, engaging with posts, and referring friends.'},
    {q:'How do squads work?',a:'Squads are communities you can create or join. Compete together in tournaments, chat, and climb leaderboards.'},
    {q:'How do I start streaming?',a:'Tap the Go Live button, set up your stream details, and connect your streaming platform. VERGR supports multi-platform streaming.'},
    {q:'How do I buy from the shop?',a:'Browse products in the Shop tab. You can pay with coins or supported payment methods.'},
    {q:'How do I report a user?',a:'Go to their profile, tap the three dots menu, and select Report. Our moderation team reviews all reports.'},
    {q:'How do I verify my account?',a:'Creator and Brand accounts can apply for verification through Settings > Account > Request Verification.'},
  ];
  return (
    <div className="screen-container min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4"><button onClick={()=>navigate(-1)} className="text-white/80"><Icon name="arrow-left" size={24}/></button><h1 className="text-white font-syne font-bold text-lg">Help Center</h1></header>
      <main className="flex-1 px-5 pb-8">
        <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-border mb-6"><Icon name="search" size={18} className="text-text-secondary mr-2"/><input className="flex-1 bg-transparent text-white text-sm outline-none" placeholder="Search help topics..."/></div>
        <p className="text-text-secondary text-xs font-bold uppercase tracking-wider mb-3">Frequently Asked</p>
        {faqs.map((f,i)=>(
          <div key={i} className="border-b border-surface-border/30">
            <button onClick={()=>setExpanded(expanded===i?null:i)} className="flex items-center gap-3 w-full py-4">
              <span className="flex-1 text-white font-semibold text-sm text-left">{f.q}</span>
              <Icon name={expanded===i?'chevron-up':'chevron-down'} size={18} className="text-text-secondary"/>
            </button>
            {expanded===i&&<p className="text-text-secondary text-sm pb-4 leading-relaxed">{f.a}</p>}
          </div>))}
        <button className="w-full py-3 mt-6 bg-surface rounded-xl text-primary font-bold text-sm border border-surface-border">Contact Support</button>
      </main>
    </div>);
}
