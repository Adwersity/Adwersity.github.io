import React, { useState } from 'react';
import '../styles.css';

const BookingForm = ({ event, onConfirm }) => {
  const [count, setCount] = useState(1);
  const [booked, setBooked] = useState(false);

  const total = count * event.price;

  const handleConfirm = () => {
    if (!booked) {
      onConfirm({ ...event, count, total });
      setBooked(true);
    }
  };

  return (
    <>
      <label>Кількість квитків: </label>
      <input
        type="number"
        className="ticket-count"
        value={count}
        min="1"
        onChange={(e) => setCount(+e.target.value)}
        disabled={booked}
      />

      <p className="total-price">Загальна вартість: {total} грн</p>

      <button
        className={`book-ticket ${booked ? 'booked' : ''}`}
        onClick={handleConfirm}
        disabled={booked}
      >
        {booked ? 'Заброньовано' : 'Забронювати квиток'}
      </button>
    </>
  );
};

export default BookingForm;
