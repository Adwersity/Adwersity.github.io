import React from 'react';

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
              {b.image && <img src={b.image} alt={b.title} className="booking-img" />}
              <h3 className="boking-event-name">{b.title}</h3>
              <p className="booking-info"><strong>Кількість квитків:</strong> {b.count}</p>
              <p className="booking-info"><strong>Сума:</strong> {b.total} грн</p>
              {b.date && (
                <p className="booking-info">
                  <strong>Дата бронювання:</strong> {new Date(b.date).toLocaleDateString()}
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
