import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookAppointment from './pages/BookAppointment';
import './App.css';

const Home = () => (
  <div className="home">
    <h1>Welcome to PhysioEase</h1>
    <p>Your trusted partner for physiotherapy appointments.</p>
    <Link to="/appointments" className="home-button">Book Appointment</Link>
  </div>
);

const About = () => (
  <div className="about">
    <h1>About Us</h1>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">PhysioEase</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/appointments">Appointments</Link>
            <Link to="/about">About Us</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<BookAppointment />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

