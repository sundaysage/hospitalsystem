import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";


const Section2a = () => {
  return (
    
    
      <motion.div
      initial={{ opacity: 0 }} // Initial state (invisible)
      animate={{ opacity: 1 }} // Final state (fully visible)
      transition={{ duration: 4 }} // Animation duration
      
    >
    <div className="bg-blue-900 w-full sm:h-vs flex ">
      <div className="bg-blue-500 opacity-80 sm:h-5/6 sm:w-9/12 m-auto sm:flex text-sm text-white p-3">
        <div className=" w-3/6 flex flex-col justify-around">
          <p className="">How we work </p>
          <h1 className="font-bold text-3xl">
            Our Working <br /> Process
          </h1>
          <p className="text-xs">
            Hospital appointments typically require prior schedulling often
            through phone or online portal Patients are expected to adhere to
            set appointment times or notify the hospital in advance for
            cancellation or resecheduling
          </p>
        </div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 h-full gap-14 m-auto">
            
            <div>
              <Image alt="mm" src='' />
              <h1>Fill The Form </h1>
              <p>
                In this article  `we will` discuss the basics of screen
                resolution,responsive design
              </p>
            </div>
            <div>
              <Image alt="mm" src='' />
              <h1>Fill The Form </h1>
              <p>
                In this article  `we will` discuss the basics of screen
                resolution,responsive design
              </p>
            </div>
            <div>
              <Image alt="mm" src='' />
              <h1>Fill The Form </h1>
              <p>
                In this article  `we will` discuss the basics of screen
                resolution,responsive design
              </p>
            </div>
            <div>
              <Image alt="mm" src='' />
              <h1>Fill The Form </h1>
              <p>
                In this article  `we will` discuss the basics of screen
                resolution,responsive design
              </p>
            </div>
         
          </div>
        </div>
      </div>
    </div>
      </motion.div>
  );
};

export default Section2a;
