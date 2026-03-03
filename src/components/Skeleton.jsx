export function SkeletonPulse({ className = '' }) {
  return <div className={`animate-pulse bg-surface-border/50 rounded-lg ${className}`} />;
}

export function PostSkeleton() {
  return (
    <div className="px-4 py-4 border-b border-surface-border/30 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-surface-border/50 shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-3.5 w-24 bg-surface-border/50 rounded" />
            <div className="h-3 w-16 bg-surface-border/30 rounded" />
          </div>
          <div className="space-y-2 mb-3">
            <div className="h-3.5 w-full bg-surface-border/40 rounded" />
            <div className="h-3.5 w-3/4 bg-surface-border/30 rounded" />
          </div>
          <div className="h-48 w-full bg-surface-border/30 rounded-2xl mb-3" />
          <div className="flex gap-8">
            <div className="h-3 w-10 bg-surface-border/30 rounded" />
            <div className="h-3 w-10 bg-surface-border/30 rounded" />
            <div className="h-3 w-10 bg-surface-border/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeedSkeleton({ count = 3 }) {
  return <>{Array.from({ length: count }).map((_, i) => <PostSkeleton key={i} />)}</>;
}

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-32 bg-surface-border/30 rounded-b-3xl" />
      <div className="px-5 -mt-10">
        <div className="w-20 h-20 rounded-full bg-surface-border/50 border-4 border-bg-dark" />
        <div className="mt-3 space-y-2">
          <div className="h-5 w-32 bg-surface-border/50 rounded" />
          <div className="h-3 w-20 bg-surface-border/30 rounded" />
          <div className="h-3 w-48 bg-surface-border/30 rounded mt-3" />
        </div>
        <div className="flex gap-6 mt-4">
          <div className="h-4 w-20 bg-surface-border/30 rounded" />
          <div className="h-4 w-20 bg-surface-border/30 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ChatSkeleton({ count = 5 }) {
  return (
    <div className="animate-pulse space-y-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`flex gap-2 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
          <div className="w-8 h-8 rounded-full bg-surface-border/50 shrink-0" />
          <div className={`${i % 2 === 0 ? 'w-2/3' : 'w-1/2'}`}>
            <div className="h-10 bg-surface-border/30 rounded-2xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SquadCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl p-4 border border-surface-border animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-surface-border/50" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-28 bg-surface-border/50 rounded" />
          <div className="h-3 w-20 bg-surface-border/30 rounded" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="bg-surface rounded-xl overflow-hidden border border-surface-border animate-pulse">
      <div className="h-40 bg-surface-border/30" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 bg-surface-border/50 rounded" />
        <div className="h-3 w-1/2 bg-surface-border/30 rounded" />
        <div className="h-4 w-16 bg-surface-border/40 rounded" />
      </div>
    </div>
  );
}
