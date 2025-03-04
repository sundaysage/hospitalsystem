"use client"; // Required for Next.js App Router

import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const PatientReg = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch(
        "https://sage-hospital.onrender.com/api/v1/auth/patient-register",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();
      setSuccessMessage("Signup successful! Redirecting...");
      setTimeout(() => {
        router.push("/patientlogin");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e0f2fe] px-4 pt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#0c4a6e] mb-6">
          Patient Sign Up
        </h2>

        {/* Error & Success Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full mb-2 object-cover border border-gray-300"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg focus:outline-none"
            />
          </div>

          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
          />

          {/* Phone Number */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
          />

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="2"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            className={`w-full py-3 rounded-lg text-lg font-semibold transition-all ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0c4a6e] text-white"
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default PatientReg;
