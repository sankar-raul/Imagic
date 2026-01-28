import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import useGetAllPlacements from "@/hooks/placement/useGetAllPlacements";
import { Iplacement } from "@/types/placement.types";

// --- Sub-Components ---
const PlacementsColumn = (props: {
  className?: string;
  placements: Iplacement[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.placements.map(
                ({ description, studentPhoto, studentName, jobTitle }, i) => (
                  <motion.li
                    key={`${index}-${i}`}
                    aria-hidden={index === 1 ? "true" : "false"}
                    tabIndex={index === 1 ? -1 : 0}
                    whileHover={{
                      scale: 1.03,
                      y: -8,
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      },
                    }}
                    whileFocus={{
                      scale: 1.03,
                      y: -8,
                      boxShadow:
                        "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      },
                    }}
                    className="p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-lg shadow-black/5 max-w-xs w-full bg-white dark:bg-neutral-900 transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <blockquote className="m-0 p-0">
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal m-0 transition-colors duration-300">
                        {description}
                      </p>
                      <footer className="flex items-center gap-3 mt-6">
                        <img
                          width={40}
                          height={40}
                          src={studentPhoto}
                          alt={`Avatar of ${studentName}`}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-800 group-hover:ring-primary/30 transition-all duration-300 ease-in-out"
                        />
                        <div className="flex flex-col">
                          <cite className="font-semibold not-italic tracking-tight leading-5 text-neutral-900 dark:text-white transition-colors duration-300">
                            {studentName}
                          </cite>
                          <span className="text-sm leading-5 tracking-tight text-neutral-500 dark:text-neutral-500 mt-0.5 transition-colors duration-300">
                            {jobTitle}
                          </span>
                        </div>
                      </footer>
                    </blockquote>
                  </motion.li>
                ),
              )}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export const PlacementsSection = () => {
  const { placements, isLoading } = useGetAllPlacements({ page: 1, limit: 50 });

  // Split placements into columns
  const firstColumn = placements.slice(0, Math.ceil(placements.length / 3));
  const secondColumn = placements.slice(
    Math.ceil(placements.length / 3),
    Math.ceil((placements.length * 2) / 3),
  );
  const thirdColumn = placements.slice(Math.ceil((placements.length * 2) / 3));

  if (isLoading) {
    return (
      <section className="bg-transparent py-24 relative overflow-hidden">
        <div className="container px-4 z-10 mx-auto text-center">
          <div className="text-neutral-600 dark:text-neutral-400">
            Loading placements...
          </div>
        </div>
      </section>
    );
  }

  if (placements.length === 0) {
    return (
      <section className="bg-transparent py-24 relative overflow-hidden">
        <div className="container px-4 z-10 mx-auto text-center">
          <div className="text-neutral-600 dark:text-neutral-400">
            No placements available
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="placements-heading"
      className="bg-transparent py-24 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 },
        }}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-135 mx-auto mb-16">
          <h2
            id="placements-heading"
            className="text-4xl font-serif md:text-5xl font-extrabold tracking-tight mt-6 text-center text-neutral-900 dark:text-white transition-colors"
          >
            Our Success Stories
          </h2>
          <p className="text-center mt-5 text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed max-w-sm transition-colors">
            Celebrating our students who have successfully launched their
            careers with top companies.
          </p>
        </div>

        <div
          className="flex justify-center gap-6 mt-10 mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Placements"
        >
          {firstColumn.length > 0 && (
            <PlacementsColumn placements={firstColumn} duration={120} />
          )}
          {secondColumn.length > 0 && (
            <PlacementsColumn
              placements={secondColumn}
              className="hidden md:block"
              duration={130}
            />
          )}
          {thirdColumn.length > 0 && (
            <PlacementsColumn
              placements={thirdColumn}
              className="hidden lg:block"
              duration={125}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PlacementsSection;
