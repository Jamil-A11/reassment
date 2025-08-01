import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookAppointment() {
  const [physiotherapists, setPhysiotherapists] = useState([]);
  const [selectedPhysio, setSelectedPhysio] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');

  // Fetch doctors on load
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/physiotherapists')
      .then(response => setPhysiotherapists(response.data))
      .catch(error => {
        console.error('Failed to load physiotherapists:', error);
        setStatus('Failed to load doctors');
      });
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPhysio || !name || !email || !date || !time) {
      setStatus('Please fill all fields.');
      return;
    }

    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const formattedTime = time.length === 5 ? `${time}:00` : time;

      const res = await axios.post('http://127.0.0.1:5000/book', {
        patient_name: name,
        email: email,
        physiotherapist_id: selectedPhysio.id,
        appointment_date: formattedDate,
        appointment_time: formattedTime
      });

      if (res.data.message === 'Appointment booked successfully') {
        setStatus(' Appointment booked successfully!');
      } else {
        setStatus('Booking failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus(' Booking failed. Try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Book an Appointment</h1>

      <h3>Select a Physiotherapist:</h3>
      <div style={{ marginBottom: '20px' }}>
        {physiotherapists.map((physio) => (
          <button
            key={physio.id}
            onClick={() => setSelectedPhysio(physio)}
            style={{
              margin: '5px',
              padding: '10px',
              borderRadius: '5px',
              border: selectedPhysio?.id === physio.id ? '2px solid purple' : '1px solid #ccc',
              backgroundColor: selectedPhysio?.id === physio.id ? '#6a0dad' : '#f0f0f0',
              color: selectedPhysio?.id === physio.id ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            {physio.name} ({physio.specialization})
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name:</label><br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div><br />

        <div>
          <label>Email:</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div><br />

        <div>
          <label>Appointment Date:</label><br />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div><br />

        <div>
          <label>Appointment Time:</label><br />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div><br />

        <button type="submit">Book Appointment</button>
      </form>

      {status && <p style={{ marginTop: '20px', color: 'green' }}>{status}</p>}
    </div>
  );
}

export default BookAppointment;
