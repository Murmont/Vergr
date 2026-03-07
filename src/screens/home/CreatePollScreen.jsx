import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { createPoll } from '../../firebase/firestore';
import Icon from '../../components/Icon';

export default function CreatePollScreen() {
  const navigate = useNavigate();
  const { showToast } = useUI();
  const { currentUser } = useAuth();
  
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState('24h');
  const [loading, setLoading] = useState(false);

  const addOption = () => options.length < 6 && setOptions(prev => [...prev, '']);
  
  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handlePost = async () => {
    if (!question.trim() || options.some(o => !o.trim())) {
      showToast('Please fill in the question and all options', 'error');
      return;
    }

    setLoading(true);
    try {
      await createPoll(currentUser.uid, {
        question: question.trim(),
        options: options.filter(o => o.trim() !== ''),
        duration
      });
      showToast('Poll created successfully!', 'success');
      navigate(-1);
    } catch (err) {
      console.error(err);
      showToast('Failed to create poll', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen-container min-h-screen bg-bg-dark flex flex-col">
      <header className="flex items-center gap-3 px-5 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="text-white/80">
          <Icon name="arrow-left" size={24} />
        </button>
        <h1 className="text-white font-syne font-bold text-lg flex-1">Create Poll</h1>
        <button 
          onClick={handlePost} 
          disabled={loading}
          className="text-brand-cyan font-semibold text-sm disabled:opacity-50"
        >
          {loading ? 'Posting...' : 'Post'}
        </button>
      </header>

      <main className="flex-1 px-5 pb-8">
        <textarea 
          value={question} 
          onChange={e => setQuestion(e.target.value)} 
          rows={2} 
          placeholder="Ask a question..." 
          className="w-full bg-surface-2 border border-border-accent rounded-xl px-4 py-3 text-white outline-none focus:border-brand-cyan resize-none text-lg mb-4"
        />
        
        <p className="text-text-secondary text-xs font-bold uppercase mb-3">Options</p>
        {options.map((o, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input 
              value={o} 
              onChange={e => updateOption(i, e.target.value)} 
              placeholder={`Option ${i + 1}`} 
              className="flex-1 bg-surface-2 border border-border-accent rounded-xl px-4 py-3 text-white outline-none focus:border-brand-cyan text-sm"
            />
            {options.length > 2 && (
              <button onClick={() => setOptions(p => p.filter((_, j) => j !== i))}>
                <Icon name="close" size={18} className="text-text-muted" />
              </button>
            )}
          </div>
        ))}
        
        {options.length < 6 && (
          <button onClick={addOption} className="flex items-center gap-2 text-brand-cyan text-sm font-semibold mt-2">
            <Icon name="add" size={16} /> Add Option
          </button>
        )}
        
        <p className="text-text-secondary text-xs font-bold uppercase mt-6 mb-3">Duration</p>
        <div className="flex gap-2">
          {['6h', '12h', '24h', '48h'].map(d => (
            <button 
              key={d} 
              onClick={() => setDuration(d)}
              className={`px-4 py-2 rounded-xl border text-sm font-bold ${duration === d ? 'border-brand-cyan text-brand-cyan' : 'border-border-accent text-text-muted'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}