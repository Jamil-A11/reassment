const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1', //  Use IPv4 instead of localhost (::1)
  user: 'root',      // Change if your user is different
  password: '',      // Add your actual MySQL password here if needed
  database: 'physio_ease'
});

db.connect(err => {
  if (err) {
    console.error(' MySQL connection failed:', err);
  } else {
    console.log(' MySQL connected...');
  }
});

module.exports = db;

