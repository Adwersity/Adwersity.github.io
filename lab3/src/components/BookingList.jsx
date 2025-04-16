import React from 'react';
import '../styles.css';

const BookingList = ({ bookings }) => {
  return (
    <div>
      <h1 className="center-heading">Мої бронювання</h1>
      <div className="bookings-list">
        {bookings.length === 0 ? (
          <p className="no-bookings">Бронювань немає</p>
        ) : (
          bookings.map((b, i) => (
            <div key={i} className="event">
              {b.image && <img src={b.image} alt={b.title} className="event-img" />}
              <h3>{b.title}</h3>
              <p className="booking-info">Кількість квитків: {b.count}</p>
              <p className="booking-info">Сума: {b.total} грн</p>
              {b.date && (
                <p className="booking-info">
                  Дата бронювання: {new Date(b.date).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingList;
