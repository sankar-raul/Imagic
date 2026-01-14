interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      aria-label="Loading..."
    />
  );
}

export function SkeletonText({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-4 ${className}`} />;
}

export function SkeletonTitle({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-8 ${className}`} />;
}

export function SkeletonButton({ className = "" }: SkeletonProps) {
  return <Skeleton className={`h-10 w-32 ${className}`} />;
}

export function SkeletonCircle({ className = "" }: SkeletonProps) {
  return <Skeleton className={`rounded-full ${className}`} />;
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return <Skeleton className={`rounded-lg ${className}`} />;
}
