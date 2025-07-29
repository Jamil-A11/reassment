import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    email: '',
    physiotherapist_id: '',
    appointment_date: '',
    appointment_time: '',
  });

  const [physiotherapists, setPhysiotherapists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/physiotherapists')
      .then(response => setPhysiotherapists(response.data))
      .catch(error => console.error('Error fetching physiotherapists:', error));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios.post('http://localhost:5000/book', formData)
      .then(res => alert(res.data))
      .catch(err => alert('Booking failed: ' + err.response?.data || err.message));
  };

  return (
    <div className="form-container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Choose Physiotherapist:
          <select
            name="physiotherapist_id"
            value={formData.physiotherapist_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            {physiotherapists.map(pt => (
              <option key={pt.id} value={pt.id}>
                {pt.name} ({pt.specialization})
              </option>
            ))}
          </select>
        </label>

        <label>
          Appointment Date:
          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Appointment Time:
          <input
            type="time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookAppointment;




