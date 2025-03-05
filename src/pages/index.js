import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import doc from "../../public/doc.jpg";
import Section2 from "../../components/Section2";
import Ourmission from "../../components/Ourmission";
import Section2a from "../../components/Section2a";
import Section3 from "../../components/Section3";

export default function Home() {
  return (
    <div className="bg-[#e0f2fe]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto py-16 px-6"
      >
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:w-1/2 text-center md:text-left text-[#075985] flex flex-col gap-6"
        >
          <h1 className="font-bold text-4xl md:text-6xl leading-tight">
            The <br />
            Hospital of the <br /> Future, Today
          </h1>
          <p className="text-sm">
            Discover the next level of medical excellence with cutting-edge
            technology, expert doctors, and a seamless healthcare experience.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-lg border border-[#075985] text-[#075985] hover:bg-[#075985] hover:text-white transition"
              >
                Make an Appointment
              </motion.button>
            </Link>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-lg border border-[#075985] text-[#075985] hover:bg-[#075985] hover:text-white transition"
              >
                Find a Doctor
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Content (Image) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="md:w-1/2 mt-8 md:mt-0"
        >
          <Image
            alt="Medical Illustration"
            src={doc}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </motion.div>
      </motion.section>

      {/* Other Sections */}
      <Ourmission />
      <Section2 />
      <Section2a />
      <Section3 />
    </div>
  );
}
