/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FC, JSX } from "react";
import { FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { LuLocate } from "react-icons/lu";
import { SiGooglemaps } from "react-icons/si";
import { SlLocationPin } from "react-icons/sl";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="relative text-text-primary px-8 py-24 pb-8">
      <div className="absolute inset-0 -z-1">
        <div
          className="w-full absolute inset-0 bg-linear-to-b from-yellow-400/20 to-yellow-300"
          style={{
            clipPath:
              "polygon(0 15%, 10% 12%, 20% 10%, 30% 9%, 40% 10%, 50% 12%, 60% 14%, 70% 15%, 80% 14%, 90% 12%, 100% 10%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div
          className="w-full absolute inset-0 bg-linear-to-b from-yellow-300/40 to-yellow-200 opacity-80"
          style={{
            clipPath:
              "polygon(0 18%, 10% 16%, 20% 15%, 30% 16%, 40% 18%, 50% 20%, 60% 21%, 70% 20%, 80% 18%, 90% 16%, 100% 15%, 100% 100%, 0 100%)",
          }}
        ></div>
        <div
          className="w-full mt-2 absolute inset-0 bg-linear-to-b from-yellow-300 to-yellow-200 opacity-60"
          style={{
            clipPath:
              "polygon(0 22%, 10% 20%, 20% 19%, 30% 20%, 40% 22%, 50% 25%, 60% 27%, 70% 26%, 80% 24%, 90% 22%, 100% 20%, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>

      <div className="flex my-4 justify-around gap-8 flex-wrap">
        <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-4">
          <h3 className="font-semibold">About Us</h3>
          <p>
            IMAGIC LEARNING SOLUTIONS PRIVATE LIMITED has been providing Digital
            Marketing, Graphic & Video Editing training with 100% Job Placement
            since 2010 in Kolkata. Affiliated to Netaji Subhas Open University.
            Registered under Ministry of Corporate affairs Govt. of India and
            MSME Govt. of India. Adobe training partner & CorelDRAW Authorized
            Training Center.
          </p>
        </div>

        <div className="w-max flex flex-col gap-4">
          <h3 className="font-semibold">Links</h3>
          <ul className="flex flex-col w-max">
            <li>
              <Link className="link" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="link" to="/news">
                News & Event
              </Link>
            </li>
            <li>
              <Link className="link" to="/testimonial">
                Testimonial
              </Link>
            </li>
            <li>
              <Link className="link" to="/showreel">
                Showreel
              </Link>
            </li>
            <li>
              <Link className="link" to="/franchise">
                Franchise
              </Link>
            </li>
            <li>
              <Link className="link" to="/students-work">
                Students Work
              </Link>
            </li>
            <li>
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-max flex flex-col gap-4">
          <h3 className="font-semibold">Get in Touch</h3>
          <div className="flex flex-col gap-2">
            <GetInTouchSections
              icon={<SlLocationPin />}
              title="15,C.R. Avenue 4th Floor. Opposite Chandni Chowk E-Mall, Kolkata -700072"
            />
            <GetInTouchSections icon={<IoCallOutline />} title="7044393332" />
            <GetInTouchSections icon={<FaWhatsapp />} title="7044393332" />
          </div>
          <div className="social-icons flex gap-4 text-2xl mt-4">
            <FaFacebook aria-label="Facebook" />
            <FiInstagram aria-label="Instagram" />
            <FaYoutube aria-label="Youtube" />
            <SiGooglemaps aria-label="Google Map" />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

interface GetInTouchSectionsProps {
  title: string;
  icon?: JSX.Element;
}
const GetInTouchSections: FC<GetInTouchSectionsProps> = ({ title, icon }) => {
  return (
    <div className="flex gap-2 items-start text-sm">
      <div className="pt-0.5">{icon}</div>
      <div>
        <p className="cursor-pointer link">{title}</p>
      </div>
    </div>
  );
};
