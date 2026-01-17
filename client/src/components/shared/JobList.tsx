import { Ijob } from "@/types/job.types";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: Ijob[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="flex justify-center">
      <div className="flex mx-5 my-5 flex-row flex-wrap md:w-3/4 justify-center gap-6 lg:gap-16 py-10">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}
