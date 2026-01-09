
const ApplyDemoForm = () => {
  return (
    <div>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#4a1a1a]">
            Apply for Demo Class
        </h2>
        
        <form className="space-y-6">
            <div>
                <label className="block text-lg font-bold mb-2">Full Name</label>
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-lg font-bold mb-2">Phone Number</label>
                <input
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-lg font-bold mb-2">Your Email</label>
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Enter Your Email Id"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500">
                        ✉
                    </span>
                </div>
            </div>

            <div>
                <label className="block text-lg font-bold mb-2">Your Course</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Course</option>
                    <option>Professional Graphic Design Course</option>
                    <option>Professional Digital Media & Marketing Course</option>
                    <option>Video Editing & Motion graphics course</option>
                    <option>Professional FCP Video Editing & VFX Course</option>
                    <option>NSOU DIGITAL MEDIA & MARKETING DIPLOMA</option>
                    <option>NSOU GRAPHICS DESIGN DIPLOMA</option>
                    <option>NSOU VIDEO EDITING DIPLOMA</option>
                    <option>Certificate Course in InDesign</option>
                    <option>Certificate Course in LightRoom</option>
                    <option>Certificate Course in FCP</option>
                    <option>Certificate Course in After Effects</option>
                </select>
            </div>

            <div>
                <label className="block text-lg font-bold mb-2">What is your answer 5 + 3</label>
                <input
                    type="text"
                    placeholder="enter answer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#5c2a2a] hover:bg-[#4a1a1a] text-white font-bold py-4 px-6 rounded-full text-lg transition-colors duration-300"
            >
                Arrange My Free Classes
            </button>
        </form>
    </div>
    </div>
  )
}

export default ApplyDemoForm
