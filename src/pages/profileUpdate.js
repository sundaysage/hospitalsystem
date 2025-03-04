import React, { useState, useEffect } from "react";
import { useAuth } from "../../components/Auth";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const ProfileUpdate = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user && !loading) {
      router.push("/patientlogin");
    } else if (user) {
      setAddress(user.address || "");
      setPhone(user.phone || "");
      setImagePreview(user.profilePicture || null); // Show existing profile image
    }
  }, [user, loading, router]);

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle Profile Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("address", address);
      formData.append("phone", phone);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await fetch(
        "https://sage-hospital.onrender.com/api/v1/patient/profile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      setSuccessMessage("Profile updated successfully! Please logout and login again to see changes.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e0f2fe] px-4 pt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#0c4a6e] mb-6">
          Update Profile
        </h2>

        {/* Error & Success Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-4">
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

          {/* Address */}
          <textarea
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows="2"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
          />

          {/* Phone Number */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]"
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            className={`w-full py-3 rounded-lg text-lg font-semibold transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0c4a6e] text-white"
            }`}
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
