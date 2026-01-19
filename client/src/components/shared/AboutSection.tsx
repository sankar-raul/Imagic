import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Building2,
  GraduationCap,
  Target,
  Users,
} from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
                  About Imagic
                </h2>
                <p className="text-neutral-600 leading-relaxed">
                  Institute of Motion Art Graphical Image and Cinematography,
                  popularly known as <strong>IMAGIC</strong> is the brand of
                  IMAGIC LEARNING SOLUTIONS PRIVATE LIMITED. Registered under{" "}
                  <strong>Ministry of Corporate affairs Govt. of India</strong>{" "}
                  and <strong>MSME</strong> (Ministry of micro, small and medium
                  Enterprise) Govt. of India and Affiliated to{" "}
                  <strong>
                    Netaji Subhas Open University, First CorelDRAW authorized
                    training partner
                  </strong>{" "}
                  in <strong>west Bengal</strong>. It's also{" "}
                  <strong>Adobe training partner</strong>.
                </p>
              </div>

              <div className="bg-linear-to-r from-neutral-50 to-transparent border-l-4 border-neutral-200 rounded-r-lg p-5">
                <p className="text-neutral-800 font-medium">
                  Our journey started in 2010 to guide students who are looking
                  for a career in multimedia and animation.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  Why Choose IMAGIC?
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Multimedia and Animation industry is growing rapidly thus
                  demand for Animator is also increasing. Animators are more in
                  demand than general graduates with some multimedia knowledge.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  So, if you want to jump on the bandwagon of Animation &
                  Multimedia industry and get excellent guidance and sound
                  technical knowledge from the only Institute in Kolkata with a
                  genuine{" "}
                  <strong className="text-yellow-500">100% placement</strong>{" "}
                  record and industry wide ties, then{" "}
                  <strong>IMAGIC Institute</strong> welcomes you to the family.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                  Our Promise
                </h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  We do not have fancy counselors, we do not have a plethora of
                  glitzy campaigns to fraud you of your hard earned money but in
                  last few years IMAGIC has created a niche position in the
                  arena of animation in Eastern India. What we promise is
                  simple:
                </p>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-600">•</span>
                    <span>Complete education on Animation & Multimedia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-600">•</span>
                    <span>Clear concepts and family-like support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-600">•</span>
                    <span>A job in Animation & Multimedia sector</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-600">•</span>
                    <span>
                      Awesome picnics and road trips throughout the year
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-linear-to-r from-neutral-50 to-transparent border-l-4 border-neutral-200 p-6">
                <p className="text-neutral-700 leading-relaxed">
                  Simple, affordable and absolutely from the heart! Drop us an
                  email if you have questions. It will not get lost in a pile of
                  corporate crap! We Will answer you back.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="p-4">
                  <h3 className="text-2xl font-bold text-neutral-800 pb-4 border-b-2 border-neutral-200">
                    Quick Facts
                  </h3>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 rounded-lg p-2 shrink-0">
                      <Building2 className="w-5 h-5 text-yellow-700" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Established</p>
                      <p className="font-semibold text-neutral-900">2010</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-lg p-2 shrink-0">
                      <Award className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">
                        Placement Record
                      </p>
                      <p className="font-semibold text-neutral-900">100%</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-lg p-2 shrink-0">
                      <GraduationCap className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Affiliated To</p>
                      <p className="font-semibold text-neutral-900">
                        Netaji Subhas Open University
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-lg p-2 shrink-0">
                      <BookOpen className="w-5 h-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">
                        Authorized Partner
                      </p>
                      <p className="font-semibold text-neutral-900">
                        CorelDRAW & Adobe
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-pink-100 rounded-lg p-2 shrink-0">
                      <Target className="w-5 h-5 text-pink-700" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Focus Areas</p>
                      <p className="font-semibold text-neutral-900">
                        Animation & Multimedia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 rounded-lg p-2 shrink-0">
                      <Users className="w-5 h-5 text-indigo-700" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500">Training Mode</p>
                      <p className="font-semibold text-neutral-900">
                        Online & Offline
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-800 rounded-2xl p-6 text-white">
                  <p className="text-sm mb-3">
                    Best Animation and Multimedia training institute in Kolkata
                    & Eastern India
                  </p>
                  <a
                    href="/contact"
                    className="block w-full bg-yellow-400 hover:bg-yellow-500 text-neutral-800 font-bold py-3 rounded-lg text-center transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
