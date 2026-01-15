import React, { useState } from "react";
import JobCard from "./ui/jobvacancy/JobCard";
import data from "../assets/jobs.json";
import { Link } from "react-router";
export type IJob = (typeof data)[0];
function JobVacancy() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

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
              <Link to={`/vacancies/${job.id}`}>
                <JobCard
                  description={job.description}
                  details={job.details}
                  id={job.id}
                  key={index}
                  image={job.image}
                  date={job.date}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  jobTitle={job.jobTitle}
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
