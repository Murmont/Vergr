import React, { useState } from 'react';
import { voteOnPoll } from '../firebase/firestore';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

export default function PollCard({ post }) {
  const { currentUser } = useAuth();
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localVotes, setLocalVotes] = useState(post.votes || {});
  const [totalVotes, setTotalVotes] = useState(post.totalVotes || 0);

  const handleVote = async (index) => {
    if (hasVoted || loading) return;
    setLoading(true);
    try {
      await voteOnPoll(post.id, index, currentUser.uid);
      setLocalVotes(prev => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
      setTotalVotes(prev => prev + 1);
      setHasVoted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPercentage = (count) => {
    if (totalVotes === 0) return 0;
    return Math.round((count / totalVotes) * 100);
  };

  return (
    <div className="mt-4 space-y-3">
      {post.options.map((option, index) => {
        const voteCount = localVotes[index] || 0;
        const percentage = getPercentage(voteCount);
        
        return (
          <button
            key={index}
            onClick={() => handleVote(index)}
            disabled={hasVoted || loading}
            className="w-full relative overflow-hidden bg-surface-2 border border-border-accent rounded-xl p-4 text-left transition-all hover:border-brand-cyan/50"
          >
            {hasVoted && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-brand-cyan/20 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            )}
            <div className="relative flex justify-between items-center z-10">
              <span className="text-text-primary font-medium">{option}</span>
              {hasVoted && (
                <span className="text-brand-cyan font-bold">{percentage}%</span>
              )}
            </div>
          </button>
        );
      })}
      <p className="text-xs text-text-muted mt-2">{totalVotes} votes</p>
    </div>
  );
}