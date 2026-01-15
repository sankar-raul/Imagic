import React, { useMemo, useState } from "react";
import JobCard from "./ui/jobvacancy/JobCard";
import { Link } from "react-router";
import useGetAllJobVacancy from "@/hooks/jobVacancy/useGetAllJobVacancy";
function JobVacancy() {
  const { isLoading, jobVacancy } = useGetAllJobVacancy();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = useMemo(
    () => Math.ceil(jobVacancy.length / itemsPerPage),
    [itemsPerPage, jobVacancy]
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * itemsPerPage,
    [currentPage, itemsPerPage]
  );
  const currentData = jobVacancy.slice(startIndex, startIndex + itemsPerPage);

  console.log(currentData);
  return (
    <div className="flex justify-center">
      <div className="container my-25">
        <div className="flex justify-center">
          <span className="bg-white/30 rounded-xl p-2 border border-neutral-100 mb-5 text-blue-600">
            ✨ Explore All Opportunites
          </span>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-yellow-400">Job Vacancies</span>
          </h1>
          <p className="text-neutral-500 my-3">
            Get Job updates for Multimedia and Animation
          </p>
          <div className="w-24 h-1 bg-linear-to-r from-yellow-300 to-yellow-100 mx-auto rounded-full"></div>
        </div>
        <div className="flex justify-center ">
          <div className="max-w-7xl">
            {currentData.map((job, index) => (
              <Link to={`/vacancies/${job.slug}`} key={index}>
                <JobCard
                  jobDetails={job.jobDetails}
                  slug={job.slug}
                  description={job.description}
                  key={index}
                  image={job.image}
                  posted_date={job.posted_date}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  type={job.type}
                  timing={job.timing}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobVacancy;
