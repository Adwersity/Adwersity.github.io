import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './styles/CommonFile.css'


const App = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  const addBooking = (booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const isBooked = (eventId) => {
    return bookings.some(b => b.id === eventId);
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="page-container">
        <Header user={user} />
        <main className="content-wrap">
          <Routes>
            <Route path="/" element={<EventsPage onBook={addBooking} user={user} isBooked={isBooked} />} />
            <Route path="/bookings" element={user ? <BookingsPage bookings={bookings} /> : <LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
