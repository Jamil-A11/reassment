const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Book appointment
app.post('/book', (req, res) => {
    const { patient_name, email, physiotherapist, appointment_date, appointment_time } = req.body;

    if (!patient_name || !email || !appointment_date || !appointment_time) {
        return res.status(400).send("All fields are required.");
    }

    const sql = `INSERT INTO appointments (patient_name, email, physiotherapist, appointment_date, appointment_time) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [patient_name, email, physiotherapist, appointment_date, appointment_time], (err) => {
        if (err) return res.status(500).send(err.message);
        res.send("Appointment booked successfully!");
    });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
