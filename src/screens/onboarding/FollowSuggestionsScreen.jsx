import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchUsers } from '../../firebase/firestore';
import TopBar from '../../components/TopBar';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';
import { formatCoins } from '../../utils/helpers';

export default function FollowSuggestionsScreen() {
  const [followed, setFollowed] = useState([]);
  const navigate = useNavigate();

  const toggleFollow = (uid) => {
    setFollowed(prev => prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid]);
  };

  return (
    <div className="screen-container min-h-screen">
      <TopBar title="Suggested For You" showBack />
      <div className="flex-1 px-4 pb-32">
        <p className="text-text-secondary text-sm mb-6">Follow creators and gamers to fill your feed</p>
        <div className="space-y-3">
          {FOLLOW_SUGGESTIONS.map(user => {
            const isFollowed = followed.includes(user.uid);
            return (
              <div key={user.uid} className="flex items-center gap-3 p-3 rounded-2xl border border-border-accent bg-surface-1 hover:border-brand-cyan/20 transition-colors">
                <UserAvatar src={user.avatar} size={50} tier={user.tier} isVerified={user.isVerified} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm truncate">{user.displayName}</span>
                    {user.isVerified && (
                      <span className="w-4 h-4 rounded-full bg-brand-cyan flex items-center justify-center shrink-0">
                        <Icon name="check" size={10} className="text-bg-dark" />
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-xs truncate">@{user.username} · {formatCoins(user.followers)} followers</p>
                  <p className="text-text-secondary text-xs truncate mt-0.5">{user.bio}</p>
                </div>
                <button
                  onClick={() => toggleFollow(user.uid)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isFollowed
                      ? 'bg-surface-2 border border-border-accent text-text-secondary'
                      : 'bg-brand-cyan text-bg-dark hover:brightness-110'
                  }`}
                >
                  {isFollowed ? 'Following' : 'Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4 bg-bg-dark/95 backdrop-blur-xl border-t border-border-accent">
        <button onClick={() => navigate('/', { replace: true })} className="btn-primary">
          {followed.length > 0 ? `Continue (${followed.length} followed)` : "Let's Go!"}
        </button>
      </div>
    </div>
  );
}
