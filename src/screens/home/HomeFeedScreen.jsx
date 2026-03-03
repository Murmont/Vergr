import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useNotifications } from '../../context/NotificationContext';
import { getFeedPosts, getTrendingPosts } from '../../firebase/firestore';
import PostCard from '../../components/PostCard';
import UserAvatar from '../../components/UserAvatar';
import CoinDisplay from '../../components/CoinDisplay';
import Icon from '../../components/Icon';
import BottomNav from '../../components/BottomNav';

const FEED_TABS = ['For You', 'Following', 'Gaming News', 'Trending'];

const NEWS_SOURCES = [
  { name: 'IGN', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/ign/all', icon: '🎮' },
  { name: 'GameSpot', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://www.gamespot.com/feeds/mashup/', icon: '🕹️' },
  { name: 'Kotaku', url: 'https://api.rss2json.com/v1/api.json?rss_url=https://kotaku.com/rss', icon: '📰' },
];

export default function HomeFeedScreen() {
  const [activeTab, setActiveTab] = useState('For You');
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [newsItems, setNewsItems] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { profile, wallet } = useUser();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const data = activeTab === 'Trending' ? await getTrendingPosts(20) : await getFeedPosts(20);
      setPosts(data);
    } catch (err) { console.error('Error fetching posts:', err); }
    setPostsLoading(false);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'Gaming News') fetchPosts();
  }, [activeTab, fetchPosts]);

  const fetchNews = useCallback(async () => {
    setNewsLoading(true);
    try {
      const allNews = [];
      for (const source of NEWS_SOURCES) {
        try {
          const res = await fetch(source.url);
          const data = await res.json();
          if (data.items) {
            allNews.push(...data.items.slice(0, 5).map(item => ({
              ...item, source: source.name, sourceIcon: source.icon,
            })));
          }
        } catch { /* skip failed source */ }
      }
      allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setNewsItems(allNews.slice(0, 20));
    } catch { /* ignore */ }
    setNewsLoading(false);
  }, []);

  useEffect(() => {
    if (activeTab === 'Gaming News' && newsItems.length === 0) fetchNews();
  }, [activeTab, newsItems.length, fetchNews]);

  const handleRefresh = async () => {
    setRefreshing(true);
    if (activeTab === 'Gaming News') await fetchNews();
    else await fetchPosts();
    setRefreshing(false);
  };

  return (
    <div className="screen-container min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="font-syne text-2xl font-bold tracking-tight text-gradient">VERGR</h1>
          <div className="flex items-center gap-2">
            <CoinDisplay amount={wallet?.balance || 0} size="sm" />
            <button onClick={() => navigate('/notifications')} className="relative w-10 h-10 rounded-full bg-surface-2/50 flex items-center justify-center hover:bg-surface-2 transition-colors">
              <Icon name="notifications" size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-brand-ember rounded-full ring-2 ring-bg-dark" />
              )}
            </button>
          </div>
        </div>
        <div className="flex gap-1 px-4 pb-2 overflow-x-auto no-scrollbar">
          {FEED_TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary hover:text-text-primary'
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </header>

      {refreshing && (
        <div className="flex justify-center py-3">
          <div className="w-5 h-5 border-2 border-brand-cyan/30 border-t-brand-cyan rounded-full animate-spin" />
        </div>
      )}

      {/* Posts Feed */}
      {activeTab !== 'Gaming News' && (
        <div>
          {postsLoading ? (
            <div className="flex flex-col items-center py-16">
              <div className="w-8 h-8 border-2 border-brand-cyan/30 border-t-brand-cyan rounded-full animate-spin mb-3" />
              <div className="space-y-0">{Array.from({length:3}).map((_,i)=>(<div key={i} className="px-4 py-4 border-b border-surface-border/30 animate-pulse"><div className="flex items-start gap-3"><div className="w-11 h-11 rounded-full bg-surface-border/50 shrink-0"/><div className="flex-1"><div className="flex gap-2 mb-2"><div className="h-3.5 w-24 bg-surface-border/50 rounded"/><div className="h-3 w-16 bg-surface-border/30 rounded"/></div><div className="space-y-2 mb-3"><div className="h-3.5 w-full bg-surface-border/40 rounded"/><div className="h-3.5 w-3/4 bg-surface-border/30 rounded"/></div><div className="h-48 w-full bg-surface-border/30 rounded-2xl"/></div></div></div>))}</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 px-6">
              <Icon name="article" size={48} className="text-text-muted mb-3 mx-auto block" />
              <p className="text-text-secondary font-semibold mb-1">No posts yet</p>
              <p className="text-text-muted text-sm mb-4">Be the first to post something!</p>
              <button onClick={() => navigate('/create-post')} className="btn-primary max-w-xs mx-auto">Create Post</button>
            </div>
          ) : (
            posts.map(post => <PostCard key={post.id} post={post} />)
          )}
        </div>
      )}

      {/* Gaming News */}
      {activeTab === 'Gaming News' && (
        <div className="px-4 py-4 space-y-4">
          {newsLoading ? (
            <div className="flex flex-col items-center py-12">
              <div className="w-8 h-8 border-2 border-brand-cyan/30 border-t-brand-cyan rounded-full animate-spin mb-3" />
              <div className="space-y-3 p-4">{Array.from({length:3}).map((_,i)=>(<div key={i} className="animate-pulse bg-surface rounded-xl p-4 border border-surface-border"><div className="h-40 bg-surface-border/30 rounded-xl mb-3"/><div className="h-4 w-3/4 bg-surface-border/50 rounded mb-2"/><div className="h-3 w-1/2 bg-surface-border/30 rounded"/></div>))}</div>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="newspaper" size={48} className="text-text-muted mb-3 mx-auto block" />
              <p className="text-text-secondary">No news available right now</p>
              <button onClick={fetchNews} className="mt-3 text-brand-cyan text-sm font-semibold">Retry</button>
            </div>
          ) : (
            newsItems.map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                className="block rounded-2xl border border-border-accent bg-surface-1 overflow-hidden hover:border-brand-cyan/30 transition-all">
                {item.thumbnail && <img src={item.thumbnail} alt="" className="w-full h-44 object-cover" loading="lazy" />}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">{item.sourceIcon}</span>
                    <span className="text-xs text-brand-cyan font-semibold">{item.source}</span>
                    <span className="text-text-muted text-xs">· {new Date(item.pubDate).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-syne font-bold text-text-primary text-base leading-snug mb-1">{item.title}</h3>
                  <p className="text-text-secondary text-sm line-clamp-2">{item.description?.replace(/<[^>]*>/g, '').slice(0, 120)}...</p>
                </div>
              </a>
            ))
          )}
        </div>
      )}

      <button onClick={() => navigate('/create-post')}
        className="fixed bottom-20 right-4 max-w-[480px] w-14 h-14 rounded-full bg-brand-gradient shadow-[0_0_30px_rgba(77,255,212,0.3)] flex items-center justify-center z-30 hover:brightness-110 active:scale-95 transition-all">
        <Icon name="add" size={28} className="text-white" />
      </button>
      <BottomNav />
    </div>
  );
}
