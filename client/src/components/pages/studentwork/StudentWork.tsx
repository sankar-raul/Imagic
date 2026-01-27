import React, { useEffect, useRef, useCallback } from "react";
import useGetAllStudentWorks from "@/hooks/studentWork/useGetAllStudentWorks";
import { IStudentWork } from "@/types/studentWork.types";

const StudentWorkCard = ({ work }: { work: IStudentWork }) => {
  console.log(work);
  return (
    <div
      style={{
        border: "1px solid #eee",
        margin: 8,
        padding: 16,
        borderRadius: 8,
      }}
    >
      <img
        src={work.thumbnailUrl}
        alt={work.title}
        style={{ width: "100%", maxWidth: 320, borderRadius: 8 }}
      />
      <h3>{work.title}</h3>
      <p>By: {work.studentName}</p>
      <p>Course: {work.courseName}</p>
      {work.videoUrl && (
        <a href={work.videoUrl} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
      )}
    </div>
  );
};

const StudentWork = () => {
  const { studentWorks, isLoading, pagination, setPage, refetchStudentWorks } =
    useGetAllStudentWorks(1, 10);

  const loader = useRef<HTMLDivElement | null>(null);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (isLoading) return;
    if (!loader.current) return;
    const { bottom } = loader.current.getBoundingClientRect();
    if (bottom <= window.innerHeight + 100) {
      if (studentWorks.length < pagination.total) {
        setPage(pagination.page + 1);
      }
    }
  }, [isLoading, studentWorks.length, pagination, setPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h2>Student Works</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
        }}
      >
        {studentWorks.map((work) => (
          <StudentWorkCard key={work._id} work={work} />
        ))}
      </div>
      <div ref={loader} />
      {isLoading && <p>Loading more...</p>}
      {studentWorks.length >= pagination.total && (
        <p>No more student works to show.</p>
      )}
    </div>
  );
};

export default StudentWork;
