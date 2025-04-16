import React from 'react';
import BookingList from '../components/BookingList';
import '../styles.css';

const BookingsPage = ({ bookings }) => {
  return (
      <main>
        <BookingList bookings={bookings} />
      </main>
  );
};

export default BookingsPage;
