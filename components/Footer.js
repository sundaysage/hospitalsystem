import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookSquare, FaYoutubeSquare } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="bg-[#075985] text-white flex flex-col items-center py-8">
      {/* Top Section */}
      <div className="w-5/6 flex flex-col md:flex-row justify-between gap-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/3"
        >
          <h3 className="font-bold text-lg">CARE PLUS</h3>
          <p className="text-sm leading-relaxed mt-2">
            A Hospital Management System providing seamless healthcare
            operations and improved patient experiences.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <FaFacebookSquare className="text-2xl cursor-pointer hover:text-[#e0f2fe] transition" />
            <FaInstagram className="text-2xl cursor-pointer hover:text-[#e0f2fe] transition" />
            <CiLinkedin className="text-2xl cursor-pointer hover:text-[#e0f2fe] transition" />
            <FaYoutubeSquare className="text-2xl cursor-pointer hover:text-[#e0f2fe] transition" />
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-2/3 flex flex-wrap justify-between [&_h3]:font-bold text-sm"
        >
          {[
            {
              title: "Company",
              links: ["Home", "About us", "Our services", "Our team", "Contact us"],
            },
            {
              title: "Services",
              links: ["Appointment Booking", "Test Suggestion", "Ambulance Services", "24/7 Medical Services", "Pharmacy"],
            },
            {
              title: "Quick Links",
              links: ["Why Choose Us", "News & Articles", "Careplus45@gmail.com", "(+234)555-0127", "63 Elgin St, Celina"],
            },
          ].map((section, index) => (
            <div key={index} className="w-1/2 md:w-auto mt-4 md:mt-0">
              <h3>{section.title}</h3>
              {section.links.map((link, i) => (
                <Link key={i} href="/">
                  <p className="hover:text-[#e0f2fe] transition">{link}</p>
                </Link>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="w-full border-t border-white mt-6 pt-4 flex flex-col md:flex-row justify-between text-center md:text-left px-6 text-sm">
        <p>© 2025 Careplus. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/">
            <p className="hover:text-[#e0f2fe] transition cursor-pointer">Privacy Policy</p>
          </Link>
          <Link href="/">
            <p className="hover:text-[#e0f2fe] transition cursor-pointer">Terms & Conditions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
