import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

const CATEGORIES = ['All', 'Creators', 'Squads', 'Streams', 'Clips', 'News'];
const TRENDING_TAGS = ['#Valorant', '#EldenRing', '#Helldivers2', '#GTA6', '#ApexLegends', '#Fortnite', '#Esports', '#Gaming'];

const EXPLORE_ITEMS = [
  { id: 1, type: 'clip', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400', title: 'Insane clutch play', views: '24K', height: 'h-52' },
  { id: 2, type: 'stream', image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400', title: 'Late night ranked', views: '1.2K', isLive: true, height: 'h-36' },
  { id: 3, type: 'clip', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400', title: 'New world record speedrun', views: '89K', height: 'h-44' },
  { id: 4, type: 'stream', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', title: 'Tournament finals', views: '5.6K', isLive: true, height: 'h-56' },
  { id: 5, type: 'clip', image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=400', title: 'Gaming setup tour', views: '12K', height: 'h-40' },
  { id: 6, type: 'clip', image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400', title: 'Epic boss fight', views: '45K', height: 'h-48' },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  return (
    <div className="screen-container min-h-screen pb-20">
      {/* Search bar */}
      <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl px-4 pt-3 pb-2">
        <label className="block relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Icon name="search" size={22} />
          </div>
          <input
            type="text" placeholder="Search gamers, squads, streams..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-2 border border-border-accent rounded-full py-3 pl-10 pr-4 text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none transition-all text-sm"
          />
        </label>
        {/* Categories */}
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trending tags */}
      <div className="px-4 py-3">
        <h3 className="text-text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Trending</h3>
        <div className="flex flex-wrap gap-2">
          {TRENDING_TAGS.map(tag => (
            <button key={tag} className="px-3 py-1.5 rounded-full bg-brand-cyan/5 border border-brand-cyan/20 text-brand-cyan text-xs font-semibold hover:bg-brand-cyan/10 transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <div className="px-4 pb-4">
        <div className="columns-2 gap-3 space-y-3">
          {EXPLORE_ITEMS.map(item => (
            <div key={item.id} className={`break-inside-avoid rounded-2xl overflow-hidden border border-border-accent/30 relative group cursor-pointer`}>
              <img src={item.image} alt={item.title} className={`w-full object-cover ${item.height}`} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {item.isLive && (
                <div className="absolute top-2 left-2 bg-brand-ember px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase">LIVE</div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-semibold leading-snug">{item.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Icon name="visibility" size={14} className="text-white/60" />
                  <span className="text-white/60 text-xs">{item.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
