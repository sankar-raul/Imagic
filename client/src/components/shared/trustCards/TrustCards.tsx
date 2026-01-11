import { FaUserGraduate } from "react-icons/fa"
import TrustCard from "../trustCard/TrustCard"
import { SiAdobe, SiCoreldraw } from "react-icons/si"
import { IoBagHandleSharp } from "react-icons/io5"

const TrustCardsProps = [
  {
    title: "NSOU Affiliated",
    description: "University-recognized certification",
    icon: <FaUserGraduate />,
  },
  {
    title: "CorelDRAW Authorized",
    description: "Official Corel training",
    icon: <SiCoreldraw />,
  },
  {
    title: "Adobe Partner",
    description: "Industry-standard tools",
    icon: <SiAdobe />,
  },
  {
    title: "Placement Support",
    description: "Career-focused guidance",
    icon: <IoBagHandleSharp />,
    },
]
const TrustCards = () => {
  return (
    <div className="flex flex-col pt-40 pb-20 md:px-40 gap-16 items-center relative bg-linear-to-b from-white/60 to-95% to-transparent" style={{
            clipPath:
              "polygon(0 15%, 10% 12%, 20% 10%, 30% 9%, 40% 10%, 50% 12%, 60% 14%, 70% 15%, 80% 14%, 90% 12%, 100% 10%, 100% 100%, 0 100%)",
          }}>
        <div className="w-[90%] mx-auto text-left flex flex-col gap-4 text-muted-text/60 self-start">
            <h1 className="text-4xl font-black font-biennale-black bg-clip-text bg-linear-to-r bg-[radial-gradient(76.3992%_72.7848%_at_54.9716%_35.443%,rgb(255,199,69)_0%,rgb(254,176,3)_28.5%,rgb(255,146,3)_71.0326%,rgb(255,80,4)_100%)] text-transparent">Why Imagic?</h1>
            <p>Industry-focused training since 2010 with lifetime job placement support.</p>
        </div>
        <div className="flex flex-col gap-6 w-[90%] md:w-4/5 3xl:w-1/2">
        {
            TrustCardsProps.map(({title, description, icon}, index) => (
                <TrustCard 
                    key={index}
                    title={title}
                    description={description}
                    icon={icon}
                />
            ))
        }
        </div>
        {/* <div className="absolute top-0 w-0.5 shadow-2xl rounded-full h-full bg-linear-to-b from-transparent via-yellow-300 to-transparent"></div> */}
    </div>
  )
}

export default TrustCards
