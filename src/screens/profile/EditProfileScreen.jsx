import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useUI } from '../../context/UIContext';
import TopBar from '../../components/TopBar';
import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';

export default function EditProfileScreen() {
  const { profile, wallet, updateProfile } = useUser();
  const { showToast } = useUI();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    displayName: profile?.displayName || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
    website: '',
    location: '',
  });

  const update = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const save = () => {
    updateProfile(form);
    showToast('Profile updated!', 'success');
    navigate(-1);
  };

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Edit Profile" showBack actions={
        <button onClick={save} className="text-brand-cyan font-semibold text-sm">Save</button>
      } />

      {/* Banner */}
      <div className="h-28 bg-gradient-to-r from-brand-violet/30 via-brand-pink/20 to-brand-cyan/30 relative">
        <button className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Icon name="photo_camera" size={28} className="text-white/70" />
        </button>
      </div>

      {/* Avatar */}
      <div className="px-4 -mt-12 relative z-10 mb-6">
        <div className="relative inline-block">
          <UserAvatar src={profile?.avatar} size={84} tier={wallet?.totalSpent || 0} />
          <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center border-2 border-bg-dark">
            <Icon name="edit" size={14} className="text-bg-dark" />
          </button>
        </div>
      </div>

      <div className="px-4 space-y-5">
        {[
          { key: 'displayName', label: 'Display Name', max: 30 },
          { key: 'username', label: 'Username', max: 20, prefix: '@' },
          { key: 'bio', label: 'Bio', max: 150, multiline: true },
          { key: 'website', label: 'Website', max: 100 },
          { key: 'location', label: 'Location', max: 50 },
        ].map(field => (
          <div key={field.key}>
            <label className="text-text-secondary text-sm mb-1.5 block">{field.label}</label>
            {field.multiline ? (
              <textarea value={form[field.key]} onChange={e => update(field.key, e.target.value)}
                maxLength={field.max} className="w-full bg-surface-2 border border-border-accent rounded-2xl p-4 text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none h-24 resize-none text-sm" />
            ) : (
              <div className="relative">
                {field.prefix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">{field.prefix}</span>}
                <input type="text" value={form[field.key]} onChange={e => update(field.key, e.target.value)}
                  maxLength={field.max} className={`input-field ${field.prefix ? 'pl-8' : ''}`} />
              </div>
            )}
            <p className="text-text-muted text-xs text-right mt-1">{form[field.key].length}/{field.max}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
