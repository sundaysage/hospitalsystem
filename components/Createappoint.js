import { useState } from 'react';

export default function CreateAppointment() {
  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    // ... other appointment fields
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://sage-hospital.onrender.com/api/v1/appointments', formData);
      alert('Appointment created successfully!');
      // Optionally, clear the form or redirect
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="patientName" placeholder="Patient Name" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} />
      {/* ... other form fields */}
      <button type="submit">Create Appointment</button>
    </form>
  );
}