import React from "react";
import Image from "next/image";

const IDCard = ({ user }) => {
  return (
    <div className="w-full max-w-xs md:max-w-sm bg-white shadow-lg rounded-xl border border-gray-300 p-4">
      {/* ✅ Header */}
      <div className="bg-[#0c4a6e] text-white text-center py-3 rounded-t-lg">
        <h2 className="text-lg font-semibold">SAGE HOSPITAL</h2>
      </div>

      {/* ✅ Profile Section */}
      <div className="flex flex-col items-center mt-4">
        {user.profileImage ? (
          <Image
            src={user.profileImage}
            alt="Profile Image"
            width={80}
            height={80}
            className="rounded-full border-4 border-[#0c4a6e] shadow-md"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
      </div>

      {/* ✅ User Info */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-gray-800">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-sm text-gray-600">📧 {user.email}</p>
        <p className="text-sm text-gray-600">📞 {user.phone}</p>
        <p className="text-sm text-gray-600">🆔 Patient ID: {user.id}</p>
        <p className="text-sm text-gray-600">
          📅 Issued: {new Date(user.createdAt).toDateString()}
        </p>
      </div>

      {/* ✅ Footer */}
      <div className="text-center text-xs text-[#0c4a6e] font-semibold mt-4 border-t pt-2">
        Authorized by Sage Hospital
      </div>
    </div>
  );
};

export default IDCard;
