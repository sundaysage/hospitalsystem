import React from "react";
import Link from "next/link";

const LoginOption = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#e0f2fe]">
      <div className="bg-white p-8 shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold text-[#075985] mb-4">Choose Your Login</h1>
        <div className="flex flex-col gap-4">
          <Link href="/patientlogin">
            <button className="w-full bg-[#075985] text-white py-2 rounded hover:bg-blue-700 transition">
              Login as Patient
            </button>
          </Link>
          <Link href="/doctorlogin">
            <button className="w-full bg-[#075985] text-white py-2 rounded hover:bg-blue-700 transition">
              Login as Doctor
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginOption;
