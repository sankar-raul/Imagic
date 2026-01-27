import React from "react";
import { IStudentWork } from "@/types/studentWork.types";
import { ProfileCard } from "../profile-card";
import VideoModal from "./VideoModal";

const StudentWorkCard = ({ work }: { work: IStudentWork }) => {
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const openVideo = (videoUrl: string) => {
    setVideoUrl(videoUrl);
  };
  const handleCloseVideo = () => {
    setVideoUrl(null);
  };
  return (
    <>
      <div className="flex justify-center">
        <ProfileCard
          description={work.courseName}
          name={work.studentName}
          image={work.thumbnailUrl}
          title={work.title}
          videoUrl={work.videoUrl}
          onClick={openVideo}
        />
        <VideoModal videoUrl={videoUrl} onClose={handleCloseVideo} />
      </div>
    </>
  );
};

export default StudentWorkCard;
