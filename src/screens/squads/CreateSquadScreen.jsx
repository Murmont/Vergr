import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import TopBar from '../../components/TopBar';
import Icon from '../../components/Icon';

const GAME_OPTIONS = ['Valorant', 'Apex Legends', 'Elden Ring', 'Fortnite', 'League of Legends', 'CS2', 'Overwatch 2', 'Call of Duty', 'Minecraft', 'Other'];

export default function CreateSquadScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [game, setGame] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { showToast } = useUI();
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!name.trim() || !game) { showToast('Name and game are required', 'error'); return; }
    showToast('Squad created! 🎮', 'success');
    navigate('/squads');
  };

  return (
    <div className="screen-container min-h-screen pb-8">
      <TopBar title="Create Squad" showBack />
      <div className="px-4 py-4 space-y-6">
        {/* Squad icon */}
        <div className="flex flex-col items-center">
          <button className="w-20 h-20 rounded-2xl bg-surface-2 border-2 border-dashed border-border-accent flex items-center justify-center hover:border-brand-cyan/30 transition-colors">
            <Icon name="add_photo_alternate" size={32} className="text-text-muted" />
          </button>
          <p className="text-text-muted text-xs mt-2">Squad Avatar</p>
        </div>

        <div>
          <label className="text-text-secondary text-sm mb-1.5 block">Squad Name *</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Apex Predators"
            className="input-field" maxLength={30} />
        </div>

        <div>
          <label className="text-text-secondary text-sm mb-1.5 block">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="What's your squad about?"
            className="w-full bg-surface-2 border border-border-accent rounded-2xl p-4 text-text-primary placeholder:text-text-muted focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan focus:outline-none h-24 resize-none text-sm" maxLength={200} />
        </div>

        <div>
          <label className="text-text-secondary text-sm mb-2 block">Game *</label>
          <div className="flex flex-wrap gap-2">
            {GAME_OPTIONS.map(g => (
              <button key={g} onClick={() => setGame(g)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  game === g ? 'bg-brand-cyan text-bg-dark' : 'bg-surface-2 text-text-secondary border border-border-accent'
                }`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-1 border border-border-accent">
          <div className="flex items-center gap-3">
            <Icon name={isPrivate ? 'lock' : 'public'} size={22} className={isPrivate ? 'text-brand-gold' : 'text-brand-cyan'} />
            <div>
              <p className="text-sm font-semibold">{isPrivate ? 'Private Squad' : 'Public Squad'}</p>
              <p className="text-xs text-text-muted">{isPrivate ? 'Members need approval to join' : 'Anyone can join'}</p>
            </div>
          </div>
          <button onClick={() => setIsPrivate(!isPrivate)}
            className={`w-12 h-7 rounded-full transition-colors ${isPrivate ? 'bg-brand-gold' : 'bg-surface-3'}`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${isPrivate ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        <button onClick={handleCreate} className="btn-primary mt-4">Create Squad</button>
      </div>
    </div>
  );
}
