import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useUI } from '../../context/UIContext';
import TopBar from '../../components/TopBar';
import UserAvatar from '../../components/UserAvatar';

export default function EditProfileScreen() {
  const { profile, updateProfile } = useUser();
  const { showToast } = useUI();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    displayName: profile?.displayName || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
  });

  const save = async () => {
    try {
      await updateProfile(form);
      showToast('Profile updated!', 'success');
      navigate(-1);
    } catch (err) {
      showToast('Update failed', 'error');
    }
  };

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Edit Profile" showBack actions={
        <button onClick={save} className="text-brand-cyan font-semibold text-sm">Save</button>
      } />

      <div className="flex flex-col items-center py-8 bg-surface-1">
        <UserAvatar src={profile?.avatar} size={100} />
        <button className="text-brand-cyan text-sm font-semibold mt-4">Change Photo</button>
      </div>

      <div className="px-4 py-6 space-y-6">
        <div>
          <label className="text-text-secondary text-xs uppercase font-bold mb-2 block">Display Name</label>
          <input type="text" value={form.displayName} onChange={e => setForm({...form, displayName: e.target.value})} 
            className="w-full bg-surface-2 border border-border-accent rounded-xl p-4 text-text-primary" />
        </div>
        <div>
          <label className="text-text-secondary text-xs uppercase font-bold mb-2 block">Bio</label>
          <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} maxLength={150}
            className="w-full bg-surface-2 border border-border-accent rounded-xl p-4 text-text-primary h-24 resize-none" />
        </div>
      </div>
    </div>
  );
}