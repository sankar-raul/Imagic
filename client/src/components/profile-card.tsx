import { motion, useReducedMotion } from "framer-motion";
import { Check, Users, UserCheck, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import ImageModal from "./shared/ImageModal";
import { createPortal } from "react-dom";

interface ProfileCardProps {
  name?: string;
  image?: string;
  followers?: number;
  following?: number;
  enableAnimations?: boolean;
  title?: string;
  className?: string;
  onClick?: (videoUrl: string) => void;
  description?: string;
  videoUrl?: string;
}

export function ProfileCard({
  name = "Sophie Bennett",
  title = "Student Work",
  image = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&h=800&fit=crop&auto=format&q=80",
  followers = 312,
  following = 48,
  videoUrl,
  enableAnimations = true,
  className,
  description = "Aspiring 3D Artist",
  onClick,
}: ProfileCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;
  const showImageModal = () => {
    console.log(image);
    setSelectedImage(image);
  };
  const closeImageModal = () => {
    console.log("close");
    setSelectedImage(null);
  };

  const containerVariants = {
    rest: {
      scale: 1,
      y: 0,
      filter: "blur(0px)",
    },
    hover: shouldAnimate
      ? {
          scale: 1.02,
          y: -4,
          filter: "blur(0px)",
          transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 28,
            mass: 0.6,
          },
        }
      : {},
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      scale: 0.95,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 8,
        stiffness: 200,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      data-slot="profile-hover-card"
      onClick={showImageModal}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.96 }}
      initial="rest"
      whileHover="hover"
      variants={containerVariants}
      className={cn(
        "relative w-80 rounded-3xl border border-border/20 text-card-foreground overflow-hidden shadow-xl shadow-black/5 cursor-pointer group backdrop-blur-sm",
        "dark:shadow-black/20",
        "grid grid-rows-[1fr_max-content] grid-cols-1 ",
        className,
      )}
    >
      {/* Full Cover Image */}
      <motion.img
        src={image}
        alt={name}
        className="h-full object-contain"
        variants={imageVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      {/* Smooth Blur Overlay - Multiple layers for seamless fade */}
      {/* <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/40 to-transparent" /> */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-white from-60% to-80% to-transparent backdrop-blur-[1px]" /> */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background/85 via-background/40 to-transparent backdrop-blur-sm" /> */}

      {/* Content */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
        }}
        className=" bottom-0 left-0 right-0 p-6 pt-4 space-y-2  bg-background"
      >
        {/* Name and Verification */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <motion.h2
            className="text-2xl font-bold text-foreground"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.02,
                },
              },
            }}
          >
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-sm leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Stats */}
        <motion.div variants={itemVariants} className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="w-4 h-4" />
            <span className="font-semibold text-foreground">{name}</span>
          </div>
        </motion.div>

        {/* Follow Button */}
        {videoUrl && (
          <motion.button
            variants={itemVariants}
            onClick={(e) => {
              e?.stopPropagation();
              onClick?.(videoUrl);
            }}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full cursor-pointer py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-200",
              "border border-border/20 shadow-sm",
              "bg-foreground text-background hover:bg-foreground/90",
              "transform-gpu",
            )}
          >
            Watch Work
          </motion.button>
        )}
      </motion.div>

      {createPortal(
        <ImageModal
          imageUrl={selectedImage}
          onClose={closeImageModal}
          alt={description}
        />,
        document.getElementById("portals")!,
      )}
    </motion.div>
  );
}
