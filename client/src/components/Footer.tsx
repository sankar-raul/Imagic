import React from 'react'
import { MapPin, Phone } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

import logo from '../assets/logo.png'

function Footer() {
  return (
      <footer className="bg-gray-300 px-6 pt-8 md:px-16 lg:px-36 w-full text-black font-[poppins] ">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                <div className="md:max-w-96">
                    <img alt="" class="h-11" src={logo} />
                    <p className="mt-6 text-sm font-normal">
IMAGIC LEARNING SOLUTIONS PRIVATE LIMITED has been providing Digital Marketing, Graphic & Video Editing training with 100% Job Placement since 2010 in Kolkata. Affiliated to Netaji Subhas Open University. Registered under Ministry of Corporate affairs Govt. of India and MSME Govt. of India. Adobe training partner & CorelDRAW Authorized Training Center.                    </p>
                    
                </div>
                <div className="flex-1 block md:flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="/contact">About Us</a></li>
                            <li><a href="#">News & Event</a></li>
                            <li><a href="#">Testimonial</a></li>
                            <li><a href="#">Showreel</a></li>
                            <li><a href="#">Students Work</a></li>
                            <li><a href="#">Franchise</a></li>
                            <li><a href="#">Login</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>

                        <div className="text-sm space-y-2">
                            <div className='flex space-x-2'>
                            <MapPin />
                            <p>Address
15,C.R. Avenue 4th Floor. <br /> Chandni Chowk, Kolkata 700072</p>
</div>
                             <div className='flex space-x-2'>
                            <Phone />
                           <p>7044393332</p>
</div>
                            
                        <div className='flex space-x-2'>
                            <FaWhatsapp size={25}/>
                           <p>7044393332</p>
</div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5 ">
                Copyright {new Date().getFullYear()} © <a href="https://prebuiltui.com">Imagic</a>. All Right Reserved.
            </p>
        </footer>
  )
}

export default Footer