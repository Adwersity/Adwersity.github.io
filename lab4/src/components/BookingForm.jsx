import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ event, onConfirm, isBooked, user }) => {
  const [count, setCount] = useState(1);
  const total = count * event.price;
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!isBooked) {
      onConfirm({ ...event, count, total });
    }
  };

  return (
    <>
      <label><strong>Кількість квитків: </strong></label>
      <input
        type="number"
        className="ticket-count"
        value={count}
        min="1"
        onChange={(e) => setCount(+e.target.value)}
        disabled={isBooked}
      />

      <p className="total-price"><strong>Загальна вартість: </strong>{total} грн</p>

      <button
        className={`book-ticket ${isBooked ? 'booked' : ''}`}
        onClick={handleConfirm}
        disabled={isBooked}
      >
        {isBooked ? 'Заброньовано' : 'Забронювати квиток'}
      </button>
    </>
  );
};

export default BookingForm;
