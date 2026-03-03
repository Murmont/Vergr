import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import Icon from './Icon';
import { timeAgo, formatCoins } from '../utils/helpers';

export default function PostCard({ post, onLike, onComment, onShare }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showOptions, setShowOptions] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
    onLike?.(post.id);
  };

  return (
    <article className="border-b border-border-accent/50 px-4 py-4 hover:bg-surface-1/30 transition-colors">
      {/* Author row */}
      <div className="flex items-start gap-3">
        <button onClick={() => navigate(`/user/${post.author?.username}`)}>
          <UserAvatar
            src={post.author?.avatar}
            size={44}
            tier={post.author?.tier}
            isVerified={post.author?.isVerified}
          />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => navigate(`/user/${post.author?.username}`)}
              className="font-semibold text-text-primary text-sm hover:underline truncate"
            >
              {post.author?.displayName}
            </button>
            {post.author?.isVerified && (
              <span className="w-4 h-4 rounded-full bg-brand-cyan flex items-center justify-center shrink-0">
                <Icon name="check" size={10} className="text-bg-dark" />
              </span>
            )}
            <span className="text-text-muted text-sm">@{post.author?.username}</span>
            <span className="text-text-muted text-xs">· {timeAgo(post.createdAt)}</span>
          </div>
          {/* Content */}
          <p className="text-text-primary text-[15px] leading-relaxed mt-1.5 whitespace-pre-wrap">
            {post.content}
          </p>
          {/* Media */}
          {post.mediaUrls?.length > 0 && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-border-accent/30">
              <img
                src={post.mediaUrls[0]}
                alt=""
                className="w-full h-auto max-h-[400px] object-cover"
                loading="lazy"
              />
            </div>
          )}
          {/* Poll */}
          {post.type === 'poll' && post.pollOptions && (
            <div className="mt-3 space-y-2">
              {post.pollOptions.map(opt => (
                <button
                  key={opt.id}
                  className="w-full relative overflow-hidden rounded-xl border border-border-accent bg-surface-2 p-3 text-left transition-all hover:border-brand-cyan/30"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-brand-cyan/10 rounded-xl transition-all duration-500"
                    style={{ width: `${opt.percentage}%` }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="text-sm text-text-primary">{opt.text}</span>
                    <span className="text-xs font-dmmono text-brand-cyan">{opt.percentage}%</span>
                  </div>
                </button>
              ))}
              <p className="text-xs text-text-muted mt-1">{formatCoins(post.totalVotes)} votes</p>
            </div>
          )}
          {/* Exclusive / Locked Content */}
          {post.type === 'exclusive' && post.locked && (
            <div className="mt-3 bg-surface-2 border border-border-accent/30 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="lock" size={16} className="text-text-muted" />
                <span className="text-xs font-bold text-brand-violet uppercase tracking-wide">
                  {post.membershipTier || 'Members'} Only
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-3">{post.previewText || 'This content is exclusive to members.'}</p>
              <button className="w-full py-2.5 rounded-xl bg-brand-violet/10 text-brand-violet text-sm font-bold border border-brand-violet/20 hover:bg-brand-violet/20 transition-colors">
                Join Membership — from {post.membershipPrice || '50 coins/mo'}
              </button>
            </div>
          )}
          {post.type === 'exclusive' && !post.locked && post.exclusiveContent && (
            <div className="mt-3 relative">
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-brand-violet/20 text-brand-violet text-[10px] font-bold rounded-full uppercase">
                Exclusive
              </div>
              <p className="text-text-primary text-[15px] leading-relaxed">{post.exclusiveContent}</p>
            </div>
          )}
          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-brand-cyan text-xs hover:underline cursor-pointer">#{tag}</span>
              ))}
            </div>
          )}
          {/* Actions */}
          <div className="flex items-center justify-between mt-3 -ml-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded-full transition-all ${
                liked ? 'text-brand-ember' : 'text-text-muted hover:text-brand-ember'
              }`}
            >
              <Icon name={liked ? 'favorite' : 'favorite_border'} filled={liked} size={20} />
              <span className="text-xs font-dmmono">{formatCoins(likeCount)}</span>
            </button>
            <button
              onClick={() => onComment?.(post.id)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-full text-text-muted hover:text-brand-cyan transition-colors"
            >
              <Icon name="chat_bubble_outline" size={20} />
              <span className="text-xs font-dmmono">{post.comments}</span>
            </button>
            <button
              onClick={() => onShare?.(post.id)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-full text-text-muted hover:text-brand-violet transition-colors"
            >
              <Icon name="repeat" size={20} />
              <span className="text-xs font-dmmono">{post.shares}</span>
            </button>
            <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-full text-text-muted hover:text-brand-gold transition-colors">
              <Icon name="bookmark_border" size={20} />
            </button>
          </div>
        </div>
        {/* Options menu */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="text-text-muted hover:text-text-secondary p-1"
        >
          <Icon name="more_horiz" size={20} />
        </button>
      </div>
    </article>
  );
}
