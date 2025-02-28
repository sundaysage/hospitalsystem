import { useState, useEffect } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  console.log("🚀 ~ Appointments ~ appointments:", appointments)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        const response = await fetch(
          "https://sage-hospital.onrender.com/api/v1/appointments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAppointments(data.data); // Adjust based on API response format
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {appointments?.map((appointment) => (
          <li key={appointment.id}>
            {appointment.title && <p>Date: {appointment.title}</p>}
            {appointment.patientName && (
              <p>Patient: {appointment.patientName}</p>
            )}
          </li>
        ))}

        {appointments.length < 1 && <p>No appointments found</p>}
      </ul>
    </div>
  );
}
