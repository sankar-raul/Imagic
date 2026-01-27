import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Award, Target, Trophy } from "lucide-react";

const features = [
  {
    step: "Feature 1",
    title: "Netaji Subhas Open University",
    content:
      "IMAGIC is the only NSOU (Netaji Subhas Open University) Affiliated Multimedia Animation Institute in entire West Bengal.",
    icon: <Award className="text-yellow-600 h-6 w-6" />,
    image:
      "https://imagic.net.in/wp-content/uploads/2024/02/WHY-IMAGIC-GFX_2_new-copy-583x400.webp",
  },
  {
    step: "Feature 2",
    title: "CorelDRAW Certificate",
    content:
      "IMAGIC is the First and Only CorelDRAW Authorized institute in Kolkata as well as in West Bengal. Our faculties are also Corel certified.",
    icon: <Target className="text-yellow-600 h-6 w-6" />,
    image:
      "https://imagic.net.in/wp-content/uploads/2024/02/WHY-IMAGIC-GFX_2_new-copy-583x400.webp",
  },
  {
    step: "Feature 3",
    title: "Adobe Certified Institute in Kolkata",
    content:
      "It's Certiport Authorized training center in Kolkata. We provide this internationally industry approved certificate to our students.",
    icon: <Trophy className="text-yellow-600 h-6 w-6" />,
    image:
      "https://imagic.net.in/wp-content/uploads/2024/02/WHY-IMAGIC-GFX_2_new-copy-583x400.webp",
  },
];

export default function FeatureSection() {
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
    <div className={"p-8 md:p-12"}>
      <motion.div
        initial={{ opacity: 0, y: 200, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto w-full max-w-7xl"
      >
        <div className="relative mx-auto mb-12 max-w-2xl sm:text-center">
          <div className="relative z-10">
            <h2 className="font-geist font-serif text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Why Imagic?
            </h2>
            <p className="font-geist text-foreground/60 mt-4">
              Imagic has been teaching Graphics Design, Video Editing and
              Digital Marketing since 2010 in Kolkata. Lifetime 100% Job
              Placement is provided to Imagic students.
            </p>
          </div>
          <div
            className="absolute inset-0 mx-auto h-44 max-w-xs blur-[118px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(147, 51, 234, 0.2) 4.54%, rgba(147, 51, 234, 0.26) 34.2%, rgba(147, 51, 234, 0.1) 77.55%)",
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
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14",
                    index === currentFeature
                      ? "border-yellow-600 bg-yellow-600/10 text-yellow-600 scale-110 [box-shadow:0_0_15px_rgba(147,51,234,0.3)]"
                      : "border-muted-foreground bg-muted",
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
              "border-yellow-600/20 relative order-1 h-[200px] overflow-hidden rounded-xl border [box-shadow:0_5px_30px_-15px_rgba(147,51,234,0.3)] md:order-2 md:h-[300px] lg:h-[400px]",
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
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="h-full w-full transform object-cover transition-transform hover:scale-105"
                        width={1000}
                        height={500}
                      />
                      <div className="from-white via-white/50 absolute right-0 bottom-0 left-0 h-2/3 bg-linear-to-t to-transparent" />

                      <div className="bg-white absolute bottom-4 left-4 rounded-lg p-2 backdrop-blur-sm">
                        <span className="text-neutral-800 text-xs font-medium">
                          {feature.title}
                        </span>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
