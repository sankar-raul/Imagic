import ApplyDemoForm from "../applyDemoForm/ApplyDemoForm";

const CoralDraw = () => {
    const from = "CorelDRAW";
  return (
            <div
          className="min-h-screen bg-linear-to-b from-gray-50/40 via-gray-100 to-transparent pt-32"
          style={{
            clipPath:
              "polygon(0 5%, 10% 4%, 20% 3%, 30% 2.5%, 40% 3%, 50% 4%, 60% 4.5%, 70% 5%, 80% 4.5%, 90% 4%, 100% 3%, 100% 100%, 0 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Learn {from} from IMAGIC?
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the benefits of learning from Kolkata's First and Only{" "}
                {from} Authorized Training Institute
              </p>
            </div>

            {/* Key Points Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
                <p className="text-gray-600">
                  Learn from {from} Trained & Certified Trainers with industry
                  experience
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Authorized Institute
                </h3>
                <p className="text-gray-600">
                  First and Only {from} Authorized Institute in Kolkata and West
                  Bengal
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Official Certification
                </h3>
                <p className="text-gray-600">
                  Get Certificate from {from} and boost your career opportunities
                </p>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-16 flex flex-wrap">
              <div className="grow flex-1 flex flex-col gap-8 min-w-75 md:mr-8 mb-8 md:mb-0">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Course Benefits
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <p className="ml-4 text-gray-700">
                        Learn with original updated software and latest tools
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <p className="ml-4 text-gray-700">
                        Hands-on training with real-world projects and case
                        studies
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <p className="ml-4 text-gray-700">
                        Open your chances in job world with big companies or
                        freelancing
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <p className="ml-4 text-gray-700">
                        Corel certified faculties with years of teaching
                        experience
                      </p>
                    </div>
                  </div>
                </div>
                {/* CTA Section */}
                <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-center text-white">
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to Start Your Journey?
                  </h2>
                  <p className="text-lg mb-6">
                    Join IMAGIC today and become a certified {from} professional
                  </p>
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
              <ApplyDemoForm />
            </div>
          </div>
        </div>
  )
}

export default CoralDraw
