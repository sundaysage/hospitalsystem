import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../../components/Auth";
const PatientList = () => {
  const { user, loading } = useAuth(); // ✅ Get user from Auth.js
  const [patients, setPatients] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/doctor-login"); // ✅ Redirect if not logged in
      return;
    }

    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Use stored token from Auth.js
        if (!token) {
          setError("Unauthorized. Please log in.");
          setFetching(false);
          return;
        }

        const response = await fetch("https://sage-hospital.onrender.com/api/v1/doctor/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }

        const data = await response.json();
        setPatients(data);
        console.log(patients)
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };

    fetchPatients();
  }, [user, loading]);

  return (
    <div className="min-h-screen p-6 bg-[#e0f2fe]">
      <div className="bg-white shadow-md p-6 rounded-lg max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[#075985] text-center mb-4">Patient List</h1>

        {fetching && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!fetching && !error && patients.length === 0 && (
          <p className="text-center text-gray-500">No patients found.</p>
        )}

        {!fetching && !error && patients.length > 0 && (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-[#075985] text-white">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Age</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="text-center border hover:bg-gray-100">
                  <td className="p-2 border">{patient.firstname}</td>
                  <td className="p-2 border">{patient.id}</td>
                  <td className="p-2 border">{patient.email}</td>
                  <td className="p-2 border">{patient.age || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientList;
