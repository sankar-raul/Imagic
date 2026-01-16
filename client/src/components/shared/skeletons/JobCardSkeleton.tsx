import {
  Skeleton,
  SkeletonText,
  SkeletonTitle,
  SkeletonButton,
} from "./Skeleton";

export default function JobCardSkeleton() {
  return (
    <div className="bg-white shrink-0 border border-neutral-200 rounded-lg shadow text-sm max-w-80">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <SkeletonTitle className="ml-2 mt-2 w-3/4" />
          <div className="space-y-2 mt-3 ml-2">
            <SkeletonText className="w-full" />
            <SkeletonText className="w-5/6" />
            <SkeletonText className="w-4/6" />
          </div>
        </div>
        <div className="mt-4 mb-3 ml-2">
          <SkeletonButton className="w-28" />
        </div>
      </div>
    </div>
  );
}
