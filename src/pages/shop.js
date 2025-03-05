import React from "react";
import Image from "next/image";

const shop = () => {
  return (
    <div>
        <div>
            
        </div>
      <section className="bg-white mt-10 p-10 rounded-lg shadow-lg mx-4 md:mx-20">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Our Shop</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 shadow-md rounded-lg">
            <Image
              src="/shop1.jpg"
              alt="Shop 1"
              width={300}
              height={200}
              className="rounded-md"
            />
            <p className="mt-2 font-semibold">Care Plus Shop 01</p>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <Image
              src="/shop2.jpg"
              alt="Shop 2"
              width={300}
              height={200}
              className="rounded-md"
            />
            <p className="mt-2 font-semibold">Care Plus Shop 02</p>
          </div>
          <div className="p-4 shadow-md rounded-lg">
            <Image
              src="/shop3.jpg"
              alt="Shop 3"
              width={300}
              height={200}
              className="rounded-md"
            />
            <p className="mt-2 font-semibold">Care Plus Shop 03</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default shop;
