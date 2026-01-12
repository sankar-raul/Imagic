import React, { useState } from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';
import FormImg from '../assets/formImg.png'

export default function DemoClassSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName && formData.email && formData.phone && formData.course) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          course: ''
        });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8" id='demoClass'>
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12">
            <div className="mb-6">
              <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-2">
                Start Your Journey
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Apply for a
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r bg-yellow-500">
                  Demo Class
                </span>
              </h1>
             
            </div>

            <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 ml-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                  />
                </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 ml-1">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 ml-1">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 00000-00000"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 ml-1">
                  Course interested in
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="">Select a course</option>
                  <option value="web-dev">Web Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="mobile-dev">Mobile Development</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="digital-marketing">Digital Marketing</option>
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-black text-white font-semibold py-3.5 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={20} />
                    Application Submitted!
                  </>
                ) : (
                  <>
                    <BookOpen size={20} />
                    Apply for Demo Class
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By applying, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

          {/* Illustration Section */}
          <div className="w-full lg:w-1/2 bg-linear-to-br from-purple-400 via-pink-400 to-orange-300 p-6 sm:p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
           <div className="flex-col">
            <img src={FormImg} alt="" />
           
              
              <div className="mt-8 space-y-2 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
                  Start Learning Today!
                </h2>
                <p className="text-white/90 text-sm sm:text-base max-w-xs mx-auto">
                  Join thousands of students on their journey to success
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}