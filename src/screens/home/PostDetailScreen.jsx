import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFeedPosts, getComments, addComment as addCommentToFirestore } from '../../firebase/firestore';
import PostCard from '../../components/PostCard';
import UserAvatar from '../../components/UserAvatar';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';
import { timeAgo } from '../../utils/helpers';

const DEMO_COMMENTS = [
  { id: 'c1', user: { name: 'FragMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FragMaster', isVerified: false }, text: 'Absolute legend! That was insane 🔥', likes: 24, time: new Date(Date.now() - 3600000), replies: 2 },
  { id: 'c2', user: { name: 'PixelQueen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PixelQueen', isVerified: true }, text: 'GGs! We should squad up sometime', likes: 18, time: new Date(Date.now() - 7200000), replies: 1 },
  { id: 'c3', user: { name: 'LootGoblin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LootGoblin', isVerified: false }, text: 'Drop the settings pls 🙏', likes: 8, time: new Date(Date.now() - 14400000), replies: 0 },
  { id: 'c4', user: { name: 'ArcticWolf', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArcticWolf', isVerified: false }, text: 'This is why I follow this account 💯', likes: 12, time: new Date(Date.now() - 28800000), replies: 0 },
];

export default function PostDetailScreen() {
  const [comments, setComments] = useState(DEMO_COMMENTS);
  const [input, setInput] = useState('');
  const [post, setPost] = useState(null);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const addComment = () => {
    if (!input.trim()) return;
    setComments(p => [{ id: `c${Date.now()}`, user: { name: 'NeonBlade', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonBlade', isVerified: true }, text: input.trim(), likes: 0, time: new Date(), replies: 0 }, ...p]);
    setInput('');
  };

  return (
    <div className="screen-container min-h-screen flex flex-col">
      <TopBar title="Post" showBack />

      <div className="flex-1 overflow-y-auto">
        {/* Post */}
        <PostCard post={post} />

        {/* Comments */}
        <div className="px-4 py-3 border-t border-border-accent/30">
          <h3 className="font-syne font-bold text-sm mb-4">Comments ({comments.length})</h3>
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-3">
                <UserAvatar src={comment.user.avatar} size={36} showTierRing={false} isVerified={comment.user.isVerified} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-sm">{comment.user.name}</span>
                    {comment.user.isVerified && (
                      <span className="w-3.5 h-3.5 rounded-full bg-brand-cyan flex items-center justify-center">
                        <Icon name="check" size={9} className="text-bg-dark" />
                      </span>
                    )}
                    <span className="text-text-muted text-xs font-dmmono">{timeAgo(comment.time)}</span>
                  </div>
                  <p className="text-text-secondary text-sm">{comment.text}</p>
                  <div className="flex items-center gap-4 mt-1.5">
                    <button className="flex items-center gap-1 text-text-muted hover:text-brand-ember transition-colors">
                      <Icon name="favorite" size={14} />
                      <span className="text-xs">{comment.likes}</span>
                    </button>
                    <button className="text-text-muted text-xs hover:text-text-secondary transition-colors">Reply</button>
                    {comment.replies > 0 && (
                      <button className="text-brand-cyan text-xs font-semibold">{comment.replies} replies</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Comment input */}
      <div className="sticky bottom-0 bg-bg-dark/95 backdrop-blur-xl border-t border-border-accent/50 p-3 flex items-center gap-2">
        <UserAvatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=NeonBlade" size={32} showTierRing={false} />
        <input type="text" placeholder="Add a comment..." value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addComment()}
          className="flex-1 bg-surface-2 border border-border-accent rounded-full py-2.5 px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:outline-none" />
        <button onClick={addComment}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${input.trim() ? 'bg-brand-cyan text-bg-dark' : 'text-text-muted'}`}>
          Post
        </button>
      </div>
    </div>
  );
}
