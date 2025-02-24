import { useState, useEffect } from "react";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        // Fetch data from Next.js API route
        const response = await fetch("/api/appointments");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAppointments(data);
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
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.title && <p>Date: {appointment.title}</p>}
            {appointment.patientName && <p>Patient: {appointment.patientName}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
