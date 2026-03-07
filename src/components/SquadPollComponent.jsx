import React, { useState } from 'react';
import Icon from './Icon';

export default function SquadPollComponent({ pollData, onVote }) {
  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleSubmit = () => {
    if (selected === null) return;
    setHasVoted(true);
    // Trigger the callback to handle the Firebase update in the parent
    if (onVote) onVote(selected);
  };

  return (
    <div className="bg-surface-2 p-4 rounded-2xl rounded-bl-none border border-border-accent w-full max-w-[280px]">
      <div className="flex items-center gap-2 mb-3">
        <Icon name="poll" size={16} className="text-brand-cyan" />
        <p className="font-bold text-text-primary text-sm">{pollData.question}</p>
      </div>
      
      <div className="space-y-2">
        {pollData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !hasVoted && setSelected(index)}
            className={`w-full text-left p-3 rounded-xl text-sm transition-all border ${
              selected === index 
                ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan' 
                : 'border-border-accent bg-bg-dark text-text-primary'
            } ${hasVoted ? 'cursor-default' : 'hover:border-brand-cyan/50'}`}
          >
            {option}
          </button>
        ))}
      </div>

      {!hasVoted && (
        <button 
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full mt-4 py-2 bg-brand-cyan rounded-lg font-bold text-bg-dark text-xs disabled:opacity-50"
        >
          Cast Vote
        </button>
      )}
      
      {hasVoted && (
        <p className="text-xs text-text-muted mt-3 text-center italic">
          Vote recorded
        </p>
      )}
    </div>
  );
}