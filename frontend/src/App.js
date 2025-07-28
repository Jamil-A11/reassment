import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({
    patient_name: '',
    email: '',
    physiotherapist: '',
    appointment_date: '',
    appointment_time: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/book', form);
      setMessage(res.data);
      setForm({
        patient_name: '',
        email: '',
        physiotherapist: '',
        appointment_date: '',
        appointment_time: '',
      });
    } catch (err) {
      setMessage(err.response?.data || "An error occurred.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="patient_name" placeholder="Your Name" value={form.patient_name} onChange={handleChange} required /><br />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required /><br />
        <select name="physiotherapist" value={form.physiotherapist} onChange={handleChange} required>
          <option value="">Choose Physiotherapist</option>
          <option value="Dr. Smith">Dr. Smith</option>
          <option value="Dr. Khan">Dr. Khan</option>
        </select><br />
        <input type="date" name="appointment_date" value={form.appointment_date} onChange={handleChange} required /><br />
        <input type="time" name="appointment_time" value={form.appointment_time} onChange={handleChange} required /><br />
        <button type="submit">Book</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;

