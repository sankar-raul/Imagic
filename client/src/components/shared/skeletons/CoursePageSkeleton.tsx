import {
  Skeleton,
  SkeletonText,
  SkeletonTitle,
  SkeletonButton,
  SkeletonCircle,
  SkeletonCard,
} from "./Skeleton";

export function CoursePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 my-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            {/* Header Skeleton */}
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-10 rounded-lg mb-4" />
              <div className="flex gap-6 mb-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="space-y-2 mb-6">
              <SkeletonText />
              <SkeletonText className="w-5/6" />
              <SkeletonText className="w-4/6" />
            </div>

            {/* Instructor Skeleton */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-white rounded-lg border border-gray-300">
              <SkeletonCircle className="w-12 h-12" />
              <div className="flex-1">
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="bg-white rounded-lg border border-gray-300 mb-8">
              <div className="flex border-b border-gray-300 p-4 gap-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <SkeletonTitle className="w-2/3" />
                <SkeletonText />
                <SkeletonText />
                <SkeletonText className="w-5/6" />
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-300 p-6 sticky top-4">
              <SkeletonCard className="w-full h-48 mb-6" />
              <div className="flex gap-3 mb-6">
                <SkeletonButton />
                <SkeletonButton className="w-24" />
              </div>
              <Skeleton className="h-12 rounded-lg mb-3" />
              <div className="space-y-3 mt-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="w-5 h-5" />
                    <SkeletonText className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
