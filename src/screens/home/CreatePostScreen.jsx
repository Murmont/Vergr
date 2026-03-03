import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useUI } from '../../context/UIContext';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';

export default function CreatePostScreen() {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('text');
  const { profile, wallet } = useUser();
  const { showToast } = useUI();
  const navigate = useNavigate();

  const handlePost = () => {
    if (!content.trim()) return;
    showToast('Post published!', 'success');
    navigate(-1);
  };

  return (
    <div className="screen-container min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl flex items-center justify-between px-4 py-3 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="text-text-secondary text-sm font-medium">Cancel</button>
        <div className="flex gap-2">
          {['text', 'image', 'poll'].map(type => (
            <button key={type} onClick={() => setPostType(type)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${postType === type ? 'bg-brand-cyan/10 text-brand-cyan' : 'text-text-muted'}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={handlePost} disabled={!content.trim()}
          className={`px-5 py-2 rounded-full font-syne font-bold text-sm transition-all ${
            content.trim() ? 'bg-brand-gradient text-white' : 'bg-surface-3 text-text-muted'
          }`}>
          Post
        </button>
      </header>

      {/* Compose area */}
      <div className="flex-1 p-4">
        <div className="flex gap-3">
          <UserAvatar src={profile?.avatar} size={44} tier={wallet?.totalSpent || 0} isVerified={profile?.isVerified} />
          <div className="flex-1">
            <textarea
              value={content} onChange={e => setContent(e.target.value)}
              placeholder="What's happening in your game world?"
              className="w-full bg-transparent text-text-primary placeholder:text-text-muted text-base leading-relaxed resize-none focus:outline-none min-h-[200px]"
              autoFocus maxLength={500}
            />
            {postType === 'image' && (
              <button className="w-full h-40 rounded-2xl border-2 border-dashed border-border-accent flex flex-col items-center justify-center gap-2 hover:border-brand-cyan/30 transition-colors mt-2">
                <Icon name="add_photo_alternate" size={32} className="text-text-muted" />
                <span className="text-text-muted text-sm">Add image or video</span>
              </button>
            )}
            {postType === 'poll' && (
              <div className="space-y-2 mt-4">
                {[1, 2, 3].map(i => (
                  <input key={i} type="text" placeholder={`Option ${i}`}
                    className="w-full bg-surface-2 border border-border-accent rounded-xl py-3 px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:outline-none" />
                ))}
                <button className="text-brand-cyan text-sm font-semibold flex items-center gap-1">
                  <Icon name="add" size={18} /> Add option
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom toolbar */}
      <div className="sticky bottom-0 bg-bg-dark border-t border-border-accent/50 px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center"><Icon name="image" size={20} className="text-brand-cyan" /></button>
          <button className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center"><Icon name="gif_box" size={20} className="text-brand-violet" /></button>
          <button className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center"><Icon name="poll" size={20} className="text-brand-gold" /></button>
          <button className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center"><Icon name="tag" size={20} className="text-brand-pink" /></button>
        </div>
        <span className="text-text-muted text-xs font-dmmono">{content.length}/500</span>
      </div>
    </div>
  );
}
