const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET physiotherapists
app.get('/physiotherapists', (req, res) => {
  const sql = `SELECT id, name, specialization FROM physiotherapists`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching physiotherapists:", err);
      return res.status(500).json({ error: "Failed to fetch physiotherapists" });
    }
    res.json(results);
  });
});

// POST: Book appointment with physiotherapist_id
app.post('/book', (req, res) => {
  const { patient_name, email, physiotherapist_id, appointment_date, appointment_time } = req.body;

  if (!patient_name || !email || !physiotherapist_id || !appointment_date || !appointment_time) {
    return res.status(400).send("All fields are required.");
  }

  const sql = `
    INSERT INTO appointments 
    (patient_name, email, physiotherapist_id, appointment_date, appointment_time)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [patient_name, email, physiotherapist_id, appointment_date, appointment_time], (err) => {
    if (err) {
      console.error("Error booking appointment:", err);
      return res.status(500).send("Error booking appointment.");
    }
    res.send("Appointment booked successfully!");
  });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

