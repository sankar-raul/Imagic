import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  SkeletonTitle,
} from "./Skeleton";

export default function TestimonialCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-start gap-4 mb-4">
        <SkeletonCircle className="w-16 h-16 flex-shrink-0" />
        <div className="flex-1">
          <SkeletonTitle className="w-32 h-6 mb-2" />
          <SkeletonText className="w-24 h-3" />
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <SkeletonText className="w-full" />
        <SkeletonText className="w-full" />
        <SkeletonText className="w-5/6" />
        <SkeletonText className="w-4/6" />
      </div>
    </div>
  );
}
