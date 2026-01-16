import PlacementCardSkeleton from "./skeletons/PlacementCardSkeleton";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50/0 via-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center my-12">
          <h1 className="text-4xl md:text-4xl font-bold text-gray-700 mb-2">
            IMAGIC Students Placement
          </h1>
          <p className="text-purple-400 text-lg">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <PlacementCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
