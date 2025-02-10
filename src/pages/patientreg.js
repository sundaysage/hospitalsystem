import React from "react";
import { useState } from "react";
import Router, { useRouter } from "next/router";


const patientreg = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during API call
    setError(null); // Clear any previous errors
    setSuccessMessage(null); // Clear any previous success messages

    try {
      const response = await fetch(
        "https://sage-hospital.onrender.com/api/v1/auth/patient-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error response
        throw new Error(errorData.message || "Signup failed"); // Display error message from API or generic message
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      setSuccessMessage("Signup successful! You can now log in.");
      setFormData({
        // Clear form after successful submission
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setTimeout(() => {  // Use setTimeout for a small delay
        router.push('/patientlogin'); // Redirect to the login page
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message); // Set error message to display
    } finally {
      setLoading(false); // Set loading to false after API call, regardless of success or failure
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {successMessage && ( <div className="text-green-500 mb-4">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* ... (Input fields - see below) */}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {/* ... (Other input fields) */}

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default patientreg;
