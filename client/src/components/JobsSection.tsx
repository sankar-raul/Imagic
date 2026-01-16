import useGetAllJobVacancy from "@/hooks/jobVacancy/useGetAllJobVacancy";
import { Link } from "react-router";

function JobsSection() {
  const { jobVacancy: jobs, isLoading } = useGetAllJobVacancy({
    page: 1,
    limit: 3,
  });

  if (isLoading) {
    return (
      <div className="my-10">
        <h1 className="md:text-4xl text-2xl font-semibold text-black uppercase text-center font-[Poppins]">
          Recent Job News
        </h1>
        <div className="flex justify-center py-10">
          <p className="text-neutral-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h1 className="md:text-4xl text-2xl font-semibold text-black uppercase text-center font-[Poppins]">
        Recent Job News
      </h1>

      <div className="flex justify-center">
        <div className="flex mx-5 my-5 flex-row flex-wrap md:w-3/4 justify-center gap-5 py-10">
          {jobs.map((job) => (
            <div
              key={job._id}
              className=" bg-white shrink-0 border border-neutral-200 rounded-lg shadow text-sm max-w-80"
            >
              <div className="p-4 flex flex-col justify-between h-full">
                <div>
                  <p className="text-neutral-800 text-xl font-semibold ml-2 mt-2">
                    {job.title}
                  </p>
                  <p className="text-neutral-600 mt-3 ml-2 line-clamp-3">
                    {job.description}
                  </p>
                </div>
                <Link to={`/vacancies/${job.slug}`}>
                  <button
                    type="button"
                    className="bg-neutral-800 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white hover:bg-neutral-900 md:cursor-pointer"
                  >
                    View jobs
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fancy Button */}
      <div className="flex justify-center">
        <a href="/vacancies">
          <button className="group px-8 py-2.5 bg-yellow-400 rounded-lg text-neutral-900 font-semibold cursor-pointer active:scale-95 transition duration-300 hover:text-white hover:bg-neutral-700">
            <p className="relative h-6 overflow-hidden">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                See All Jobs
              </span>
              <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:-translate-y-full">
                Jobs
              </span>
            </p>
          </button>
        </a>
      </div>
    </div>
  );
}

export default JobsSection;
