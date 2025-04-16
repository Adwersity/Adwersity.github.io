import React from 'react';
import '../styles.css';
import BookingForm from './BookingForm';

const EventCard = ({ event, onBook }) => {
    const eventDate = new Date(event.date);
    const formattedDate = new Intl.DateTimeFormat('uk-UA', { dateStyle: 'long' }).format(eventDate);
  
    return (
      <article className="event">
        <img src={event.image} alt={event.title} />
        <h2>{event.title}</h2>
        <p><strong>Дата:</strong> {formattedDate}</p>
        <p><strong>Місце:</strong> {event.location}</p>
        <p><strong>Ціна:</strong> <span className="ticket-price">{event.price}</span> грн</p>
        <BookingForm event={event} onConfirm={onBook} />
      </article>
    );
  };
  
  export default EventCard;
