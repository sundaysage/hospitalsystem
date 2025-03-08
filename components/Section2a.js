import React from "react";
import { motion } from "framer-motion";
import { FaUserDoctor } from "react-icons/fa6";
import { FaRegFileAlt } from "react-icons/fa";
import { TbReport } from "react-icons/tb";
import { BsJournalBookmark } from "react-icons/bs";

const Section2a = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#075985] w-full py-10 overflow-hidden" // Prevents overflow
    >
      <div className="bg-[#e0f2fe] opacity-90 max-w-full md:max-w-6xl mx-auto p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:w-1/2 text-center md:text-left text-[#075985] flex flex-col gap-4"
        >
          <p className="text-lg font-light">How We Work</p>
          <h1 className="text-3xl font-bold">Our Working Process</h1>
          <p className="text-sm">
            Hospital appointments typically require prior scheduling, often
            through phone or an online portal. Patients are expected to adhere
            to set appointment times or notify the hospital in advance for
            cancellation or rescheduling.
          </p>
        </motion.div>

        {/* Right Content (Process Steps) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="md:w-1/2 grid grid-cols-2 gap-6 mt-6 md:mt-0"
        >
          {[
            { title: "Fill The Form", description: "Submit your details online for appointment scheduling.", icon: <FaRegFileAlt size={40} /> },
            { title: "Check-ups", description: "Our specialists will conduct necessary medical evaluations.", icon: <FaUserDoctor size={40} /> },
            { title: "Book an Appointment", description: "Schedule a convenient date and time for your visit.", icon: <BsJournalBookmark size={40} /> },
            { title: "Get Report", description: "Receive a detailed report with personalized medical advice.", icon: <TbReport size={40} /> },
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white text-[#075985] p-5 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-[#075985] text-white flex items-center justify-center rounded-full mb-3">
                {step.icon}
              </div>
              <h2 className="font-bold text-lg">{step.title}</h2>
              <p className="text-xs">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Section2a;
