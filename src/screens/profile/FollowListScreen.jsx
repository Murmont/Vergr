import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';
import { formatCoins } from '../../utils/helpers';

const DEMO_USERS = [
  { uid: '1', username: 'PixelQueen', displayName: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen', followers: 38000, isVerified: true, tier: 'Diamond', isFollowing: true },
  { uid: '2', username: 'Shroud', displayName: 'Shroud', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shroud', followers: 62000, isVerified: true, tier: 'Diamond', isFollowing: false },
  { uid: '3', username: 'FragMaster', displayName: 'Jake Torres', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FragMaster', followers: 5400, isVerified: false, tier: 'Silver', isFollowing: true },
  { uid: '4', username: 'LootGoblin', displayName: 'Maya Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LootGoblin', followers: 8900, isVerified: false, tier: 'Platinum', isFollowing: true },
  { uid: '5', username: 'ArcticWolf', displayName: 'Leo Frost', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArcticWolf', followers: 2300, isVerified: false, tier: 'Gold', isFollowing: false },
  { uid: '6', username: 'VoidRunner', displayName: 'Zara Void', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VoidRunner', followers: 1100, isVerified: false, tier: 'Bronze', isFollowing: false },
];

export default function FollowListScreen() {
  const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab || 'followers');
  const [users, setUsers] = useState(DEMO_USERS);
  const [search, setSearch] = useState('');

  const toggleFollow = (uid) => {
    setUsers(prev => prev.map(u => u.uid === uid ? { ...u, isFollowing: !u.isFollowing } : u));
  };

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title={activeTab === 'followers' ? 'Followers' : 'Following'} showBack />

      {/* Tabs */}
      <div className="flex px-4 border-b border-border-accent/50">
        {['followers', 'following'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`relative flex-1 py-3 text-sm font-syne font-semibold text-center capitalize transition-colors ${
              activeTab === t ? 'text-text-primary' : 'text-text-muted'
            }`}>
            {t}
            {activeTab === t && <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-brand-gradient rounded-full" />}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <label className="block relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
            <Icon name="search" size={20} />
          </div>
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-2 border border-border-accent rounded-full py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:outline-none" />
        </label>
      </div>

      {/* List */}
      <div className="divide-y divide-border-accent/20">
        {filtered.map(user => (
          <div key={user.uid} className="flex items-center gap-3 px-4 py-3">
            <UserAvatar src={user.avatar} size={48} tier={user.tier} isVerified={user.isVerified} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm truncate">{user.displayName}</span>
                {user.isVerified && (
                  <span className="w-4 h-4 rounded-full bg-brand-cyan flex items-center justify-center shrink-0">
                    <Icon name="check" size={10} className="text-bg-dark" />
                  </span>
                )}
              </div>
              <p className="text-text-muted text-xs">@{user.username} · {formatCoins(user.followers)} followers</p>
            </div>
            <button onClick={() => toggleFollow(user.uid)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                user.isFollowing ? 'bg-surface-2 border border-border-accent text-text-secondary' : 'bg-brand-cyan text-bg-dark'
              }`}>
              {user.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
