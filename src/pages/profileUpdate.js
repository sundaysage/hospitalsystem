import React from "react";
import { AuthProvider } from "../../components/Auth";
import { useAuth } from "../../components/Auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const profileUpdate = () => {

  const { user, loading } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState("");

  useEffect(() => {
      if (!user && !loading) {
          router.push("/patientlogin");
        }
    }, [user, loading, router]);
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                "https://sage-hospital.onrender.com/api/v1/patient/profile",

        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({address}),
        }
      );
      if (!response.ok) {
        throw new Error("failed to update ");
      }
      console.log("Profile updated successfully");
      alert("profile updated successfully Please logout and login again for changes to show");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("failed to update ")
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Update Profile</h2>

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default profileUpdate;
