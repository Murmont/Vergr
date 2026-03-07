import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

const CATEGORIES = ['All', 'Creators', 'Squads', 'Streams', 'Clips', 'News'];

export default function ExploreScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]); // State for dynamic tags
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch Trending Tags (Assuming a 'trending' collection exists)
    const tagsQuery = query(collection(db, 'trending'), limit(10));
    const unsubscribeTags = onSnapshot(tagsQuery, (snapshot) => {
      const tags = snapshot.docs.map(doc => doc.data().tag || doc.data().name);
      setTrendingTags(tags.length > 0 ? tags : ['#Gaming', '#Esports', '#Streams']);
    });

    // 2. Listen to real posts
    const q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );

    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(postData);
      setLoading(false);
    });

    return () => {
      unsubscribeTags();
      unsubscribePosts();
    };
  }, []);

  return (
    <div className="screen-container min-h-screen pb-20 bg-bg-dark">
      <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl px-4 pt-3 pb-2">
        <label className="block relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Icon name="search" size={22} />
          </div>
          <input
            type="text" placeholder="Search gamers, squads, streams..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-2 border border-border-accent rounded-full py-3 pl-10 pr-4 text-text-primary text-sm focus:border-brand-cyan transition-colors outline-none"
          />
        </label>
        <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary hover:bg-surface-3'
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        <h3 className="text-text-muted text-[10px] font-bold uppercase tracking-widest mb-3">Trending Now</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map(tag => (
            <button key={tag} className="px-3 py-2 rounded-xl bg-surface-2 border border-border-accent text-brand-cyan text-xs font-bold hover:border-brand-cyan/50 transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-8 h-8 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-text-muted text-sm font-dmmono">Scanning the meta...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="columns-2 gap-3 space-y-3">
            {items.map(item => (
              <div key={item.id} className="break-inside-avoid rounded-2xl overflow-hidden border border-border-accent/30 relative group cursor-pointer hover:border-brand-cyan/40 transition-all">
                <img src={item.mediaUrl} alt={item.caption} className="w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-bold leading-tight line-clamp-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-10">
            <Icon name="explore" size={48} className="mx-auto text-surface-3 mb-4" />
            <p className="text-text-secondary text-sm">No transmissions found. Be the first to broadcast!</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}