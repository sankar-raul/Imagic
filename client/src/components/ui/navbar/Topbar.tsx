import { MapPin, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Topbar() {
    return (
        <div className="bg-yellow-400 text-gray-800 py-3 px-4 lg:flex justify-center hidden">
            <div className="container max-w-6xl  mx-auto block md:flex justify-between items-center text-sm">
                <div className="flex items-center  gap-6">
                    <div className="flex items-center  gap-2 hover:text-white">
                        <span className="font-semibold"><Phone/></span>
                        <a href="tel:+1234567890" className=" font-semibold">
                            7044393332
                        </a>
                    </div>
                    
                    <div className="flex items-center gap-2 hover:text-white">
                        <span className="font-semibold"><FaWhatsapp size={25}/></span>
                        <a 
                            href="https://wa.me/7044393332" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-semibold"
                        >
                            7044393332
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-semibold"><MapPin/></span>
                    <p>15,C.R. Avenue 4th Floor. Chandni Chowk, Kolkata 700072</p>
                </div>
            </div>
        </div>
    );
}