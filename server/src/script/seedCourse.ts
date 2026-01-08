import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Course from "../models/course/course.model.js"

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log("mongodb connected successfully ✅");
  } catch (error) {
    console.error(`Mongodb connected error : ${error.message}`);
    process.exit(1);
  }
};


const seedCourse = async (): Promise<void> => {
  await connectDB();

  const courseData = {
    title: "Graphic Design Professional Course",
    short_description:
      "Learn professional graphic design with hands-on training and real-world projects.",

    courseDetails: {
      price: 25000,
      image: "https://example.com/images/graphic-design-course.jpg",
      category: "Design",
      startOn: new Date("2026-02-01"),
      duration: "6 Months",
      eligibility: "10+2 or equivalent",
      branch: "Mumbai",
    },

    course_overview:
      "This Graphic Design course is designed to make students industry-ready by teaching essential design tools, principles, and real project execution.",

    courseSyllabus: [
      {
        title: "Corel Draw",
        description:
          "Learn vector graphic design for print media including banners, visiting cards, and flex designs.",
        tools: [
          {
            name: "Corel Draw",
            description: "Vector-based design software for print media",
          },
        ],
      },
      {
        title: "Adobe Photoshop CC",
        description:
          "Master photo editing, retouching, and creative manipulation.",
        tools: [
          {
            name: "Adobe Photoshop CC",
            description: "Industry-standard photo editing tool",
          },
        ],
      },
      {
        title: "Adobe Illustrator CC",
        description: "Learn logo design and vector illustrations.",
        tools: [
          {
            name: "Adobe Illustrator CC",
            description: "Vector illustration and logo design software",
          },
        ],
      },
      {
        title: "DTP & Color Correction",
        description:
          "Understand print layouts, color theory, and professional color correction.",
        tools: [
          { name: "Adobe InDesign CC" },
          { name: "Adobe Lightroom CC" },
        ],
      },
    ],

    students_work: [
      {
        tool: "Adobe Photoshop CC",
        name: "Poster Design Project",
        description:
          "Creative poster designed by student as part of course project",
        image: "https://example.com/student-work/poster.jpg",
      },
      {
        tool: "Adobe Illustrator CC",
        name: "Logo Design Project",
        description: "Professional logo design created by student",
        image: "https://example.com/student-work/logo.jpg",
      },
    ],

    reviews: [
      {
        name: "Amit Verma",
        rating: 5,
        comment:
          "Excellent course! The practical training helped me get a job quickly.",
        date: new Date("2025-11-15"),
      },
      {
        name: "Neha Singh",
        rating: 4,
        comment:
          "Great faculty and real-world assignments. Highly recommended.",
        date: new Date("2025-12-01"),
      },
    ],

    students_testimonials: [
      {
        name: "Rahul Mehta",
        designation: "Graphic Designer",
        testimonial:
          "This course completely transformed my design skills and confidence.",
        image: "https://example.com/testimonials/rahul.jpg",
        video: "https://example.com/videos/rahul-testimonial.mp4",
      },
      {
        name: "Pooja Sharma",
        designation: "Freelance Designer",
        testimonial:
          "Hands-on projects and expert guidance made learning very easy.",
        image: "https://example.com/testimonials/pooja.jpg",
      },
    ],
  };

  try {
    const course = await Course.create(courseData);
    console.log("🎉 Course inserted successfully");
    console.log("🆔 Course ID:", course._id);
  } catch (error) {
    console.error("❌ Error inserting course:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
  }
};

seedCourse();
