import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';
import AboutPage from './pages/AboutPage';
import Header from './components/Header';
import Footer from './components/Footer'; 
import './styles.css';

const App = () => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    setBookings(prev => [...prev, booking]);
  };

  return (
    <Router>
      <div className="page-container">
        <Header />
        <main className="content-wrap">
          <Routes>
            <Route path="/" element={<EventsPage onBook={addBooking} />} />
            <Route path="/bookings" element={<BookingsPage bookings={bookings} />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
