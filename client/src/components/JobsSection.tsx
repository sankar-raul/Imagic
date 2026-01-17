import useGetAllJobVacancy from "@/hooks/jobVacancy/useGetAllJobVacancy";
import SectionHeader from "@/components/shared/SectionHeader";
import JobList from "@/components/shared/JobList";
import ViewAllButton from "@/components/shared/ViewAllButton";
import JobLoadingState from "@/components/shared/JobLoadingState";

function JobsSection() {
  const { jobVacancy: jobs, isLoading } = useGetAllJobVacancy({
    page: 1,
    limit: 3,
  });

  if (isLoading) {
    return <JobLoadingState />;
  }

  return (
    <div className="my-10">
      <SectionHeader title="Recent Job News" />

      <JobList jobs={jobs} />

      <ViewAllButton
        href="/vacancies"
        primaryText="See All Jobs"
        secondaryText="Jobs"
      />
    </div>
  );
}

export default JobsSection;
