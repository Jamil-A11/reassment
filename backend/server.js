const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '', // or your MySQL password
  database: 'physio_ease'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('MySQL connected...');
  }
});

// GET physiotherapists
app.get('/physiotherapists', (req, res) => {
  db.query('SELECT * FROM physiotherapists', (err, results) => {
    if (err) {
      console.error('Error fetching physiotherapists:', err);
      return res.status(500).json({ error: 'Failed to fetch physiotherapists' });
    }
    res.json(results);
  });
});

// POST book appointment
app.post('/book', (req, res) => {
    console.log('Incoming POST body:', req.body);
  const { patient_name, email, physiotherapist_id, appointment_date, appointment_time } = req.body;

  if (!patient_name || !email || !physiotherapist_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `
    INSERT INTO appointments (patient_name, email, physiotherapist_id, appointment_date, appointment_time)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [patient_name, email, physiotherapist_id, appointment_date, appointment_time], (err) => {
    if (err) {
      console.error('Error booking appointment:', err);
      return res.status(500).json({ error: 'Booking failed' });
    }
    res.json({ message: 'Appointment booked successfully' });
  });
});

app.listen(5000, '127.0.0.1', () => {
    console.log('Server running on http://127.0.0.1:5000');
  });
  