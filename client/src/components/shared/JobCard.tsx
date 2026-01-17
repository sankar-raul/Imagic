import { Link } from "react-router";
import { Ijob } from "@/types/job.types";

interface JobCardProps {
  job: Ijob;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white shrink-0 border border-neutral-50/50 lg:p-2 rounded-lg text-sm max-w-80 hover:bg-neutral-50 transition-shadow duration-300">
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
            className="bg-neutral-800 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white hover:bg-neutral-900 md:cursor-pointer transition-colors duration-200"
          >
            View jobs
          </button>
        </Link>
      </div>
    </div>
  );
}
