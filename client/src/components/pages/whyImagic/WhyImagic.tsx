import { useParams } from "react-router";
import { useMemo } from "react";
import CoralDraw from "../../shared/whyImagic/CoralDraw";
import NSOU from "../../shared/whyImagic/NSOU";

const WhyImagic = () => {
  const { id } = useParams<{ id: string }>();
  const pages = useMemo(() => (
    {
        'coreldraw': <CoralDraw />,
        'netaji-subhas-open-university': <NSOU />,
    }
  ), [])
  return (
    <main>
      <div>
        {id && pages[id as keyof typeof pages]}
      </div>
    </main>
  );
};

export default WhyImagic;
