import { Skeleton } from "./Skeleton";

export default function CourseCardSkeleton() {
  return (
    <div className="relative rounded-3xl shadow-lg h-112.5 overflow-hidden">
      {/* Image Section Skeleton */}
      <div className="h-1/2 rounded-t-3xl overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content Card Skeleton */}
      <div className="absolute bottom-0 rounded-3xl left-0 right-0 bg-white rounded-t-3xl h-1/2 p-6 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          {/* Category and Duration Pills */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-20 rounded-2xl" />
            <Skeleton className="h-7 w-24 rounded-2xl" />
          </div>

          {/* Title */}
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />

          {/* Description Lines */}
          <div className="space-y-2 mt-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
