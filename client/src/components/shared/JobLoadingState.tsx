interface JobLoadingStateProps {
  message?: string;
}

export default function JobLoadingState({
  message = "Loading jobs...",
}: JobLoadingStateProps) {
  return (
    <div className="my-10">
      <h1 className="md:text-4xl text-2xl font-semibold text-black uppercase text-center font-[Poppins]">
        Recent Job News
      </h1>
      <div className="flex justify-center py-10">
        <p className="text-neutral-600">{message}</p>
      </div>
    </div>
  );
}
