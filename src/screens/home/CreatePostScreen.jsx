import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useUI } from '../../context/UIContext';
import { auth } from '../../firebase/config';
import { createPost, uploadPostMedia, updatePostMediaUrl } from '../../firebase/firestore';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';

export default function CreatePostScreen() {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null); // { file: File, preview: string, type: 'image' | 'video' }
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  const { profile } = useUser();
  const { showToast } = useUI();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type.startsWith('video/') ? 'video' : 'image';
    
    setMedia({
      file,
      preview: URL.createObjectURL(file),
      type
    });
  };

  const clearMedia = () => {
    if (media?.preview) URL.revokeObjectURL(media.preview);
    setMedia(null);
  };

  const handlePost = async () => {
    if (!content.trim() && !media) return;

    setLoading(true);
    try {
      // 1. Create the post record
      const postData = {
        content: content.trim(),
        type: media ? media.type : 'text',
      };
      
      const postId = await createPost(auth.currentUser.uid, postData);

      // 2. Upload media if it exists and update the post document
      if (media) {
        const downloadURL = await uploadPostMedia(postId, media.file);
        await updatePostMediaUrl(postId, downloadURL);
      }

      showToast('Post published!', 'success');
      navigate(-1);
    } catch (err) {
      console.error("Post creation error:", err);
      showToast("Failed to publish post", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen-container min-h-screen bg-bg-dark flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-xl flex items-center justify-between px-4 py-4 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="text-text-muted hover:text-white">Cancel</button>
        <button 
          onClick={handlePost}
          disabled={loading || (!content.trim() && !media)}
          className="bg-brand-cyan text-bg-dark px-6 py-1.5 rounded-full font-black text-xs uppercase tracking-widest disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </header>

      {/* Input */}
      <main className="flex-1 p-4">
        <div className="flex gap-4">
          <UserAvatar src={profile?.avatar} size={40} />
          <textarea
            autoFocus
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What's happening?"
            className="flex-1 bg-transparent text-white text-lg placeholder:text-text-muted outline-none min-h-[120px] resize-none"
          />
        </div>

        {/* Media Preview Area */}
        {media && (
          <div className="mt-4 relative group rounded-2xl overflow-hidden border border-border-accent">
            {media.type === 'image' ? (
              <img src={media.preview} alt="Preview" className="w-full max-h-[300px] object-cover" />
            ) : (
              <video src={media.preview} className="w-full max-h-[300px] bg-black" controls />
            )}
            <button 
              onClick={clearMedia}
              className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full hover:bg-black/80"
            >
              <Icon name="close" size={16} className="text-white" />
            </button>
          </div>
        )}
      </main>

      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*,video/*" 
      />

      <footer className="p-4 border-t border-border-accent/50 flex gap-4">
        <button onClick={() => fileInputRef.current?.click()} className="text-brand-cyan hover:text-white transition-colors">
          <Icon name="image" size={24} />
        </button>
        <button onClick={() => navigate('/create-poll')} className="text-brand-gold hover:text-white transition-colors">
          <Icon name="poll" size={24} />
        </button>
      </footer>
    </div>
  );
}