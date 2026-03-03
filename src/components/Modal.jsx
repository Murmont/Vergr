import { useEffect } from 'react';
import Icon from './Icon';

export default function Modal({ isOpen, onClose, title, children, fullScreen = false }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative w-full max-w-[480px] bg-surface-1 border-t border-border-accent animate-slide-up ${
          fullScreen ? 'h-full rounded-none' : 'rounded-t-3xl max-h-[85vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        {!fullScreen && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-border-accent" />
          </div>
        )}
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-accent/50">
            <h2 className="font-syne text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center">
              <Icon name="close" size={18} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
