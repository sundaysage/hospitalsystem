import React from "react";
import { TbTargetArrow } from "react-icons/tb";
import { HiLightBulb } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";
import { motion } from "framer-motion";

const Ourmission = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center sm:mb-16 bg-sky-800 text-white py-10 px-6 sm:px-0 space-y-6 sm:space-y-0 sm:space-x-6">
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        className="text-center w-full sm:w-1/4 p-4 cursor-pointer"
      >
        <TbTargetArrow className="text-5xl mx-auto bg-white text-sky-800 p-2 rounded-full" />
        <h1 className="text-lg font-bold mt-2">Our Mission</h1>
        <p className="text-sm">
          Our mission is to provide unwavering <br />
          compassionate care to every individual <br />
          entrusting us with their health.
        </p>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        className="text-center w-full sm:w-1/4 p-4 cursor-pointer"
      >
        <HiLightBulb className="text-5xl mx-auto bg-white text-sky-800 p-2 rounded-full" />
        <h1 className="text-lg font-bold mt-2">Our Vision</h1>
        <p className="text-sm">
          Our vision is to innovate and <br />
          elevate healthcare standards <br />
          for a better tomorrow.
        </p>
      </motion.div>
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        className="text-center w-full sm:w-1/4 p-4 cursor-pointer"
      >
        <FaUserDoctor className="text-5xl mx-auto bg-white text-sky-800 p-2 rounded-full" />
        <h1 className="text-lg font-bold mt-2">Who We Are?</h1>
        <p className="text-sm">
          We are a dedicated healthcare team <br />
          committed to excellence and <br />
          patient-centered care.
        </p>
      </motion.div>
    </div>
  );
};

export default Ourmission;
