import JobCardSkeleton from "./skeletons/JobCardSkeleton";

export default function JobLoadingState() {
  return (
    <div className="my-10">
      <h1 className="md:text-4xl text-2xl font-semibold text-black uppercase text-center font-[Poppins]">
        Recent Job News
      </h1>
      <div className="flex justify-center">
        <div className="flex mx-5 my-5 flex-row flex-wrap md:w-3/4 justify-center gap-5 py-10">
          {[...Array(3)].map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
