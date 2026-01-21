export default function BlogCardSkeleton() {
  return (
    <div className="bg-neutral-50 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-64 bg-neutral-200"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
        <div className="h-6 bg-neutral-200 rounded"></div>
        <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
        <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
      </div>
    </div>
  );
}
