import React from 'react';
import BookingList from '../components/BookingList';

const BookingsPage = ({ bookings }) => {
  return (
      <main>
        <BookingList bookings={bookings} />
      </main>
  );
};

export default BookingsPage;
