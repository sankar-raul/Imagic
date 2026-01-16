import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Send,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/contexts/ToastContext";
import { useNewsletter } from "@/hooks/newsletter/useNewsletter";
import logo from "../assets/logo.jpg";

function Footer() {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading } = useNewsletter();
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showError("Please enter a valid email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Please enter a valid email address");
      return;
    }

    const result = await subscribe(email);

    if (result.success) {
      showSuccess(result.message || "Successfully subscribed!");
      setEmail("");
    } else {
      showError(result.message || "Failed to subscribe");
    }
  };

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info & Newsletter */}
          <div className="relative lg:col-span-2">
            <img alt="Imagic Logo" className="h-11 mb-4" src={logo} />
            <p className="mb-6 text-sm text-muted-foreground">
              IMAGIC LEARNING SOLUTIONS PRIVATE LIMITED has been providing
              Digital Marketing, Graphic & Video Editing training with 100% Job
              Placement since 2010 in Kolkata. Affiliated to Netaji Subhas Open
              University. Registered under Ministry of Corporate affairs Govt.
              of India and MSME Govt. of India. Adobe training partner &
              CorelDRAW Authorized Training Center.
            </p>
            <h3 className="mb-4 text-lg font-semibold">Stay Connected</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="relative" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-12 backdrop-blur-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground"
                disabled={isLoading}
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Subscribe</span>
                </motion.button>
              </Button>
            </form>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="/about"
                className="block transition-colors hover:text-primary"
              >
                About Us
              </a>
              <a
                href="/news-events"
                className="block transition-colors hover:text-primary"
              >
                News & Event
              </a>
              <a
                href="/testimonial"
                className="block transition-colors hover:text-primary"
              >
                Testimonial
              </a>
              <a
                href="/showcase"
                className="block transition-colors hover:text-primary"
              >
                Showreel
              </a>
              <a
                href="/student-work"
                className="block transition-colors hover:text-primary"
              >
                Students Work
              </a>
              <a
                href="/franchise"
                className="block transition-colors hover:text-primary"
              >
                Franchise
              </a>
              <a
                href="/login"
                className="block transition-colors hover:text-primary"
              >
                Login
              </a>
            </nav>
          </div>

          {/* Get in Touch */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Get in touch</h3>
            <address className="space-y-3 text-sm not-italic">
              <div className="flex gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <a
                  href="https://g.page/ImagicInstitute"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  15, C.R. Avenue 4th Floor.
                  <br />
                  Chandni Chowk, Kolkata 700072
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="h-4 w-4 shrink-0" />
                <a
                  href="tel:+917044393332"
                  className="hover:text-primary transition-colors"
                >
                  7044393332
                </a>
              </div>
              <div className="flex gap-2 items-center">
                <FaWhatsapp className="h-4 w-4 shrink-0" />
                <a
                  href="https://wa.me/917044393332"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  7044393332
                </a>
              </div>
            </address>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="mb-4 text-sm font-semibold">Follow Us</h4>
              <div className="flex space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://www.facebook.com/imagicinstitute"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-9 w-9"
                        >
                          <Facebook className="h-4 w-4" />
                          <span className="sr-only">Facebook</span>
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://www.youtube.com/@ImagicInstitute"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-9 w-9"
                        >
                          <Youtube className="h-4 w-4" />
                          <span className="sr-only">YouTube</span>
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Subscribe on YouTube</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://www.instagram.com/imagicinstitute/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-9 w-9"
                        >
                          <Instagram className="h-4 w-4" />
                          <span className="sr-only">Instagram</span>
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="https://g.page/ImagicInstitute"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full h-9 w-9"
                        >
                          <FaMapMarkerAlt className="h-4 w-4" />
                          <span className="sr-only">Google Maps</span>
                        </Button>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Find us on Google Maps</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            Copyright {new Date().getFullYear()} ©{" "}
            <a href="/" className="hover:text-primary transition-colors">
              Imagic
            </a>
            . All Right Reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="/privacy" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-primary">
              Terms of Service
            </a>
            <a href="/cookies" className="transition-colors hover:text-primary">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
