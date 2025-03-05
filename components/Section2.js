import Link from "next/link";
import React from "react";
import doc from "../public/doc.jpg";
import Image from "next/image";




const Section2 = () => {
  return (
    <div className="sm:h-h bg-sky-100">
      <div className="flex sm:w-5/6 sm:m-auto sm:h-3/6 sm:pb-3 justify-around">
        <div className="sm:w-2/5 sm:h-5/6">
          <Image
            alt="#"
            src=""
            width=""
            height=""
            className="sm:w-full h-full"
          />
        </div>
        <div className=" sm:w-2/5  sm:h-5/6 flex sm:flex-col justify-around">
          <p className="font-light">The Great Place of </p>
          <h1 className="text-sky-900 font-bold text-2xl">
            Medical Hospital Center
          </h1>
          <p className="text-sm">
            In this article well discuss the basics of screen resolution
            respondive design amd Why understanding is critical for your UX and
            conversion rate optimization.
          </p>
          <div className="text-sm font-semi-bold">
            <p>Ambulance Services</p>
            <p>Ambulance Services</p>
            <p>Ambulance Services</p>
            <p>Ambulance Services</p>
            <p>Ambulance Services</p>
          </div>
          <Link href="/">
            <button className="p-1 rounded border border-black">
              Discover
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-red-700  h-f flex flex-col justify-around">
        <div>Our Services</div>
        <div className="h-4/5  ">
          <div className="bg-white w-1/6 h-full flex flex-col justify-around items-center	">
            <div className="w-3/4 carsss">
              <Image
                alt="img"
                src={doc}
                objectFit="cover"
                width=""
                height=""
                className="w-5/6 "
              />
            </div>
            <div>
              <h1>Rehab Centre</h1>
              <p className=" font-light text-xs">
                A where People Who have injuries or <br />
                sudden illnesses emergency treatment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
