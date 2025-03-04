import Image from "next/image";
import localFont from "next/font/local";
import Nav from "../../components/Nav";
import doc from "../../public/doc.jpg";
import Link from "next/link";
import { motion } from "framer-motion";
import Section2 from "../../components/Section2";
import Ourmission from "../../components/Ourmission";
import Section2a from "../../components/Section2a";
import Section3 from "../../components/Section3";
export default function Home() {
  return (
    <div className="bg-sky-100">
       <motion.div
        initial={{ opacity: 0 }} // Initial state (invisible)
        animate={{ opacity: 1 }} // Final state (fully visible)
        transition={{ duration: 4 }} // Animation duration
        
      >
      <section className="sm:flex sm:w-full">
        <div className="flex sm:w-4/5 sm:m-auto sm:justify-around sm:items-center sm:h-v-v ">
          <div className="sm:w-2/5 flex sm:flex-col ">
            <div>
              <h1 className="flex font-bold sm:text-6xl">
                The <br />
                hospital of the <br /> Future,Today
              </h1>
              <p>
                In this article well discuss the basics of screen resolution
                respondive design amd Why understanding is critical for your UX
                and conversion rate optimization.
              </p>
            </div>

            <div className=" flex justify-between mt-3 w-5/6 ">
              <Link href="/">
                <div className=" border border-black p-1 rounded">
                  Make an Appopointment
                </div>
              </Link>
              <Link href="/">
                <div className="border border-black p-1 rounded">
                  Find a Doctor{" "}
                </div>
              </Link>
            </div>
          </div>
          <div className="sm:w-3/6 sm:h-5/6">
            <Image
              alt=""
              src={doc}
              width=""
              height=""
              className="sm:w-full sm:h-full "
            />
          </div>
        </div>
      </section>{" "}
     
       

      </motion.div>
      <Ourmission />
      <Section2 />
      <Section2a />
      <Section3 />
    </div>
  );
}
