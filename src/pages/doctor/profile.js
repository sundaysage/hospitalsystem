import React from 'react';
import Image from 'next/image';

const docProfile = () => {
  return (
    <div>
      <section className="bg-white p-10 rounded-lg shadow-lg mx-4 md:mx-20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image src="/doctor.jpg" alt="...Doctor Profile" width={200} height={200} className="rounded-full" />
          <div>
            <h2 className="text-2xl font-bold text-blue-600">Dr. Jon Aderson</h2>
            <p className="text-gray-600">Cardiology | 10 Years Experience</p>
            <p className="mt-4 text-gray-700">
              Dr. Jon Aderson specializes in cardiology with a decade of experience in providing top-tier healthcare
              services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default docProfile;
