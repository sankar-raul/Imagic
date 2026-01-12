// import React from 'react';
// import { Award, Target, Trophy, Building2 } from 'lucide-react';

// export default function LearnerSupportSection() {
//   const achievements = [
//     {
//       icon: Award,
//       title: "Netaji Subhas Open University",
//       description: "IMAGIC is the only NSOU (Netaji Subhas Open University) Affiliated Multimedia Animation Institute in entire West Bengal.",
//       color: "bg-pink-100 text-pink-600"
//     },
//     {
//       icon: Target,
//       title: "CorelDRAW Certificate",
//       description: "IMAGIC is the First and Only CorelDRAW Authorized institute in Kolkata as well as in West Bengal. Our faculties are also Corel certified.",
//       color: "bg-teal-100 text-teal-600"
//     },
//     {
//       icon: Trophy,
//       title: "Adobe Certified Institute in Kolkata",
//       description: "It's Certiport Authorized training center in Kolkata. We provide this internationally industry approved certificate to our students.",
//       color: "bg-yellow-100 text-yellow-600"
//     }
//   ];

//   return (
//     <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//           {/* Left Column - Main Content */}
//           <div className="order-2 lg:order-1">
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 mb-6 leading-tight">
//               Why Imagic?
//             </h2>
//             <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
//  Imagic has been teaching Graphics Design, Video Editing and Digital Marketing since 2010 in Kolkata. Lifetime 100% Job Placement is provided to Imagic students.
//              </p>
            
//             {/* Image for mobile/tablet */}
//             <div className="lg:hidden mb-8 rounded-2xl overflow-hidden shadow-lg">
//               <img 
//                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop" 
//                 alt="Students collaborating" 
//                 className="w-full h-64 sm:h-80 object-cover"
//               />
//             </div>
//           </div>

//           {/* Right Column - Achievement Cards */}
//           <div className="order-1 lg:order-2 space-y-6">
//             {achievements.map((item, index) => (
//               <div 
//                 key={index}
//                 className="flex items-start gap-4 p-4 sm:p-6 bg-white rounded-xl hover:shadow-xl border border-gray-200 transition-shadow duration-300"
//               >
//                 <div className={`shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg ${item.color} flex items-center justify-center`}>
//                   <item.icon className="w-6 h-6 sm:w-7 sm:h-7" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
//                     {item.title}
//                   </h3>
//                   <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
// 'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Rocket, Code, Paintbrush } from 'lucide-react';

const features = [
  {
    step: 'Step 1',
    title: 'Build Faster',
    content:
      'Create your MVP in record time with our pre-built blocks and components.',
    icon: <Rocket className="text-primary h-6 w-6" />,
    image:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 2',
    title: 'Customize Easily',
    content:
      'Tailor every component to your needs with our intuitive design system and flexible architecture.',
    icon: <Paintbrush className="text-primary h-6 w-6" />,
    image:
      'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 3',
    title: 'Deploy Confidently',
    content:
      'Launch your product with confidence using our optimized, responsive, and accessible components.',
    icon: <Code className="text-primary h-6 w-6" />,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
  {
    step: 'Step 4',
    title: 'Add Yours!',
    content:
      'Contribute your own blocks and become part of the MVPBlocks community.',
    icon: <Code className="text-primary h-6 w-6" />,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function FeatureSteps() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (4000 / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className={'p-8 md:p-12'}>
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative mx-auto mb-12 max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h2 className="font-geist text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Build Your MVP in Three Steps
            </h2>
            <p className="font-geist text-foreground/60 mt-3">
              MVPBlocks helps you create, customize, and deploy your product
              faster than ever before.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                'linear-gradient(152.92deg, rgba(192, 15, 102, 0.2) 4.54%, rgba(192, 11, 109, 0.26) 34.2%, rgba(192, 15, 102, 0.1) 77.55%)',
            }}
          ></div>
        </div>
        <hr className="bg-foreground/30 mx-auto mb-10 h-px w-1/2" />

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{
                  opacity: index === currentFeature ? 1 : 0.3,
                  x: 0,
                  scale: index === currentFeature ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14',
                    index === currentFeature
                      ? 'border-primary bg-primary/10 text-primary scale-110 [box-shadow:0_0_15px_rgba(192,15,102,0.3)]'
                      : 'border-muted-foreground bg-muted',
                  )}
                >
                  {feature.icon}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className={cn(
              'border-primary/20 relative order-1 h-[200px] overflow-hidden rounded-xl border [box-shadow:0_5px_30px_-15px_rgba(192,15,102,0.3)] md:order-2 md:h-[300px] lg:h-[400px]',
            )}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full transform object-cover transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                      <div className="from-background via-background/50 absolute right-0 bottom-0 left-0 h-2/3 bg-gradient-to-t to-transparent" />

                      <div className="bg-background/80 absolute bottom-4 left-4 rounded-lg p-2 backdrop-blur-sm">
                        <span className="text-primary text-xs font-medium">
                          {feature.step}
                        </span>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
