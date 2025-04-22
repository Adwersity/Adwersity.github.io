import React, { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import Filters from '../components/Filters';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

const EventsPage = ({ onBook, user, isBooked }) => {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events'); 
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const today = new Date().toISOString();
      const futureEvents = eventsList.filter(e => e.date >= today);
      setEvents(futureEvents); 
    };
    
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters(events, filterType, sortBy);
  }, [events, filterType, sortBy]);
  
  const applyFilters = (eventsList, typeFilter, sortValue) => {
    let temp = [...eventsList];
    if (typeFilter) {
      temp = temp.filter(e => e.type === typeFilter);
    }
    if (sortValue === 'price') {
      temp.sort((a, b) => a.price - b.price);
    } else {
      temp.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    setFiltered(temp);
  };

  const handleFilterChange = (filterTypeChanged, value) => {
    const newFilterType = filterTypeChanged === 'type' ? value : filterType;
    const newSortBy = filterTypeChanged === 'sort' ? value : sortBy;

    setFilterType(newFilterType);
    setSortBy(newSortBy);

    applyFilters(events, newFilterType, newSortBy);
  };

  return (
    <div>
      <h1>Події</h1>
      <Filters onFilterChange={handleFilterChange} />
      <div className="event-grid">
        {filtered.map(event =>
          <EventCard key={event.id} event={event} onBook={onBook} user={user} isBooked={isBooked(event.id)}/>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
