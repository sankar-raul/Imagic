import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  SkeletonTitle,
} from "./Skeleton";

export default function PlacementCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center border border-gray-100">
      <div className="relative mb-6">
        <SkeletonCircle className="w-24 h-24" />
      </div>

      <SkeletonTitle className="w-32 mb-1" />
      <SkeletonText className="w-24 mb-4" />

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-5 h-5" />
        ))}
      </div>

      <div className="space-y-2 w-full">
        <SkeletonText className="w-full" />
        <SkeletonText className="w-5/6 mx-auto" />
        <SkeletonText className="w-4/6 mx-auto" />
      </div>
    </div>
  );
}
