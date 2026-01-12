function JobsSection() {
  const jobs = [
    {
      title: "Video Editing Job Vacancy in kolkata",
      img: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      desc: "The Video Editor role at The Bubblegum Co. in Hindustan Park, Kolkata, is a full-time, on-site position requiring work Monday to Saturday (10:30 AM-6:30 PM). Compensation ranges from ₹2.5 to 4 LPA based on experience and skill.",
      jobId : 2
    },
    {
      title: "Graphic Designer Job Vacancy in Kolkata",
      img: "https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=400",
      desc: "The Graphic Designer position at Careerhaat in Kolkata (Kankurgachi) is for candidates with 2+ years of experience in the E-commerce/Startup industry. This is an in-person role.",
      jobId : 4
    },
    {
      title: "Digital Marketing Job Vacancy in Kolkata",
      img: "https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=400",
      desc: "The Future Welfare Academy in Kolkata seeks a Digital Marketing Service Provider (M/F) to handle social media/Google pages. It requires 2-3 years' experience and pays up to ₹15K for the 11 a.m.-7 p.m. shift.",
      jobId: 3
    }
  ];

  return (
    <div className="my-10">
      <h1 className="md:text-4xl text-2xl font-semibold text-black uppercase text-center font-[Poppins]">
        Recent Job News
      </h1>

      <div className="flex justify-center">
        <div className="block mx-5 my-5 md:flex md:w-3/4 justify-around gap-5 py-10">

          {jobs.map((job, index) => (
            <div
              key={index}
              className=" bg-white border border-gray-200 rounded-lg shadow text-sm max-w-80"
            >
              <img
                className="rounded-t-md max-h-40 w-full object-cover"
                src={job.img}
                alt={job.title}
              />
              <div className="p-4">
              <p className="text-gray-900 text-xl font-semibold ml-2 mt-2">
                {job.title}
              </p>
              <p className="text-gray-600 mt-3 ml-2">{job.desc}</p>
              <a href={`/jobs/${job.jobId}`}>
              <button
                type="button"
                className="bg-indigo-600 mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded text-white hover:bg-indigo-700"
              >
                View jobs
              </button>
              </a>
              </div>

              
            </div>
          ))}

        </div>
      </div>

      {/* Fancy Button */}
      <div className="flex justify-center">
        <a href="/jobvacancy">
        <button className="group px-8 py-2.5 bg-indigo-600 rounded-lg text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-indigo-700">
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
