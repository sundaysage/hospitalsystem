import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import doc from "../public/doc.jpg";
import doc2 from "../public/doc2.jpg";

const Section2 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#e0f2fe] py-10"
    >
      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-center md:w-5/6 mx-auto gap-6">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-2/5"
        >
          <Image
            alt="Medical Center"
            src={doc2}
            width={500}
            height={300}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-2/5 flex flex-col gap-4 text-center md:text-left"
        >
          <p className="font-light text-lg text-[#075985]">The Great Place of</p>
          <h1 className="text-[#075985] font-bold text-3xl">
            Medical Hospital Center
          </h1>
          <p className="text-sm text-[#075985]">
            In this article, we will discuss the basics of screen resolution,
            responsive design, and why understanding them is critical for UX
            and conversion rate optimization.
          </p>

          {/* Services List */}
          <div className="text-sm font-semibold text-[#075985]">
            <p>✔️ Ambulance Services</p>
            <p>✔️ Emergency Treatment</p>
            <p>✔️ Surgery & Rehabilitation</p>
            <p>✔️ 24/7 Medical Support</p>
          </div>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 mt-2 rounded-lg border border-[#075985] text-[#075985] hover:bg-[#075985] hover:text-white transition"
            >
              Discover
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Services Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="bg-[#075985] text-white py-10 mt-10"
      >
        <h2 className="text-center text-3xl font-semibold mb-6">Our Services</h2>

        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white text-[#075985] w-72 p-5 rounded-lg shadow-lg flex flex-col items-center"
            >
              <Image
                alt="Emergency Room"
                src={doc}
                width={200}
                height={150}
                className="rounded-lg mb-3"
              />
              <h3 className="font-bold text-lg">Emergency Room</h3>
              <p className="text-xs text-center">
                A place where people with injuries or sudden illnesses receive
                emergency treatment.
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Section2;
