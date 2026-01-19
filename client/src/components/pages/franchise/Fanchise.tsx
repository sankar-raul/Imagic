import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  DollarSign,
  GraduationCap,
  Handshake,
  Lightbulb,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import useCustomScroll from "@/hooks/global/useCustomScroll";
import { useEffect } from "react";

const Fanchise = () => {
  const { scrollToTop } = useCustomScroll();
  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);
  const benefits = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Netaji Subhas Open University affiliated",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: "First CorelDRAW authorised training centre in West Bengal",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Adobe authorised training partner",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Government registered company",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Providing training & placement from 2010",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Complete digital marketing support",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Experienced industry experts to guide you",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Online back office - No back office team needed",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      title: "Best student placement in Kolkata industry",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: <Handshake className="w-6 h-6" />,
      title: "Industry-linked, highly demanding job oriented courses",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "24X7 Support to make your center profitable",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  const requirements = [
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "600-1500 sq. ft. of space in a good location",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      text: "Capacity to invest 10 to 12 lakhs",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Franchise Opportunities"
        subtitle="Partner with Kolkata's #1 Animation Institute"
      />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-linear-to-br from-neutral-900 via-neutral-800 to-black text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The Animation Institute Franchise is a Smart,{" "}
              <span className="text-yellow-400">Lucrative Business</span>
            </h2>
            <p className="text-lg text-neutral-300 leading-relaxed mb-4">
              The Animation Institute Franchise is available from{" "}
              <strong className="text-white">
                IMAGIC LEARNING SOLUTIONS PRIVATE LIMITED.
              </strong>
            </p>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Start your own business by becoming an education franchisee of
              IMAGIC. Our franchise opportunities help entrepreneurs start their
              own animation training center. So, if you are looking to set up a
              computer training center in Durgapur, Siliguri, Bardhaman,
              Asansol, Baharampur, or any other part of West Bengal, Odisha,
              Bihar, Assam, etc., then iMAGIC is the right choice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <p className="text-neutral-700 leading-relaxed mb-4">
                IMAGIC has been giving training in Multimedia, Digital Media &
                Marketing and providing job placement since 2010.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Professional Graphic Designer, Web Designer and Developer, FCP
                Video Editor, Digital Marketers are in very good demand. Instant
                job placement support is provided directly to students.
              </p>
            </div>

            <div className="bg-linear-to-br from-yellow-50 to-orange-100 rounded-2xl p-8 border-2 border-yellow-200">
              <p className="text-neutral-700 leading-relaxed">
                IMAGIC will also provide full{" "}
                <strong className="text-neutral-900">
                  Digital Marketing support
                </strong>{" "}
                for business development.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why IMAGIC Section */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Why <span className="text-yellow-500">IMAGIC?</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-100 hover:-translate-y-2"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-linear-to-br ${benefit.color} flex items-center justify-center text-white mb-4`}
                >
                  {benefit.icon}
                </div>
                <p className="text-neutral-700 font-medium leading-relaxed">
                  {benefit.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Need Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">
                What You <span className="text-yellow-500">Need?</span>
              </h2>

              <div className="space-y-6 mb-8">
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-neutral-50 rounded-lg p-4"
                  >
                    <div className="bg-yellow-400 rounded-lg p-2 text-black shrink-0">
                      {req.icon}
                    </div>
                    <p className="text-neutral-700 font-medium">{req.text}</p>
                  </div>
                ))}
              </div>

              <div className="bg-linear-to-br from-neutral-900 to-black text-white rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">IMAGIC Offers:</h3>
                <p className="text-neutral-300 leading-relaxed">
                  Professional courses in Digital Media & Marketing, Graphic
                  Design, Web Design & Development, Video Editing. Short term
                  Certificate courses & one year NSOU certified Diploma Courses
                  are also available.
                </p>
              </div>
            </motion.div>

            {/* Investment & Returns */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Minimum Area */}
              <div className="bg-neutral-900 text-white/95 rounded-2xl p-8 shadow-xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <h3 className="text-xl font-bold">MINIMUM AREA REQUIRED</h3>
                </div>
                <p className="text-3xl font-bold">600 - 1500 sq. ft.</p>
              </div>

              {/* Investment */}
              <div className="bg-neutral-900 text-white/95 rounded-2xl p-8 shadow-xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <h3 className="text-xl font-bold">INITIAL INVESTMENT</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Total Investment:</span>
                    <span className="text-xl font-bold">₹10 - 12 Lakh</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/20 pb-2">
                    <span>Center set up cost:</span>
                    <span className="text-xl font-bold">₹3 Lakh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Franchisee fees:</span>
                    <span className="text-xl font-bold">₹3 Lakh</span>
                  </div>
                </div>
              </div>

              {/* Payback Period */}
              <div className="bg-neutral-900 text-white/95 rounded-2xl p-8 shadow-xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <h3 className="text-xl font-bold">PAYBACK PERIOD</h3>
                </div>
                <p className="text-3xl font-bold">2.0 - 2.5 Years</p>
              </div>

              {/* CTA */}
              <div className="bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center shadow-xl">
                <h3 className="text-2xl font-bold text-black mb-4">
                  Ready to Start Your Journey?
                </h3>
                <a
                  href="/contact"
                  className="inline-block bg-black hover:bg-neutral-800 text-white font-bold px-8 py-4 rounded-lg transition-colors"
                >
                  Contact Us Today
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fanchise;
