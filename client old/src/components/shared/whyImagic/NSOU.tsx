
const NSOU = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Netaji Subhas Open University
            </h1>
            <p className="text-blue-100 text-lg">
              <span className="font-semibold">February 25, 2024</span> • Imagic
            </p>
          </div>

          <div className="px-8 py-8">
            {/* Main Content */}
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  <span className="font-bold text-blue-700">IMAGIC</span> is the only{" "}
                  <span className="font-bold text-blue-600">NSOU</span>{" "}
                  <span className="text-gray-600">(Netaji Subhas Open University)</span>{" "}
                  Affiliated <span className="font-semibold">Multimedia Animation Institute</span>{" "}
                  in entire <span className="font-semibold">West Bengal</span>.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  Along with getting <span className="font-bold text-yellow-700">DIPLOMA</span>{" "}
                  by taking the course from <span className="font-bold">IMAGIC</span>, you will get{" "}
                  <span className="font-bold text-yellow-600">100% JOB PLACEMENT</span>.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed">
                  <span className="font-bold text-blue-700">IMAGIC</span> has been providing{" "}
                  <span className="font-semibold">Life Time Job Support</span> along with proper training{" "}
                  to the students for last <span className="font-bold text-blue-600">14 years</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-5">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              IMAGIC Offers
            </h2>
          </div>

          <div className="px-8 py-8">
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { name: "Graphic Design", icon: "🎨" },
                { name: "Video Editing", icon: "🎬" },
                { name: "Digital Marketing", icon: "📱" },
                { name: "Web Design & Development", icon: "💻" },
                { name: "2D Animation", icon: "🎭" },
              ].map((course, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-blue-50 to-yellow-50 hover:from-blue-100 hover:to-yellow-100 border-2 border-blue-200 hover:border-yellow-400 rounded-xl p-5 transition-all duration-300 hover:shadow-lg cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{course.icon}</span>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Diploma in</p>
                      <p className="text-lg font-bold text-blue-700 group-hover:text-blue-800">
                        {course.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-yellow-700 uppercase mb-2">
                  Minimum Qualification
                </h3>
                <p className="text-3xl font-bold text-yellow-800">10+2</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-blue-700 uppercase mb-2">
                  Session
                </h3>
                <p className="text-2xl font-bold text-blue-800">June / December</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NSOU;
