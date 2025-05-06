import React, { useState, useEffect, useCallback } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ eventId, user }) => {
  const [rating, setRating] = useState(0);
  const [average, setAverage] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [showRatings, setShowRatings] = useState(false);
  const pageSize = 10;

  const fetchRatings = useCallback(async (reset = false) => {
    let url = `/api/ratings/${eventId}?pageSize=${pageSize}`;
    if (!reset && lastVisible) {
      url += `&lastVisible=${lastVisible}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (reset) {
      setRatings(data.ratings);
    } else {
      setRatings(prev => [...prev, ...data.ratings]);
    }

    setAverage(data.average);
    setLastVisible(data.lastVisible);
    setHasMore(data.hasMore);

    const userRating = data.ratings.find(r => r.userId === user.uid);
    if (userRating) {
      setRating(userRating.rating);
    }
  }, [eventId, user.uid, lastVisible]);

  useEffect(() => {
    fetchRatings(true);
  }, [fetchRatings]);

  const handleRate = async (value) => {
    setRating(value);

    await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, rating: value, userId: user.uid,}),
    });

    setLastVisible(null);
    fetchRatings(true);
  };

  return (
    <div>
      <p><strong>Оцінка події:</strong></p>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar key={star} color={star <= rating ? '#ffc107' : '#e4e5e9'}
          size={24} style={{ cursor: 'pointer' }} onClick={() => handleRate(star)}/>
      ))}

      {average !== null && ( <p><strong>Середня оцінка:</strong> {average}</p>)}

      <button onClick={() => setShowRatings(prev => !prev)} className = "btn-to-hide-ratings">
        {showRatings ? 'Сховати відгуки' : 'Показати відгуки'}
      </button>

      {showRatings && (
        <>
          <ul>
            {ratings.map((r, index) => (
              <li key={r.id || index}> Користувач оцінив на {r.rating} ⭐</li>))}
          </ul>

          {hasMore && (
            <button onClick={() => fetchRatings()} style={{ marginTop: '10px' }}> Завантажити ще </button>)}
        </>
      )}
    </div>
  );
};

export default RatingStars;