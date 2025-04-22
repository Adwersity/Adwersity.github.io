import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ eventId, user }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchRating = async () => {
        const ratingRef = doc(db, 'ratings', `${user.uid}_${eventId}`);
        const docSnap = await getDoc(ratingRef);
        if (docSnap.exists()) {
          setRating(docSnap.data().rating);
        }
      };
      fetchRating();
    }
  }, [eventId, user]);

  const handleRate = async (value) => {
    setRating(value);
    await setDoc(doc(db, 'ratings', `${user.uid}_${eventId}`), {
      userId: user.uid,
      eventId: eventId,
      rating: value,
    });
  };

  return (
    <div>
      <p><strong>Оцінка події:</strong></p>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          color={star <= rating ? '#ffc107' : '#e4e5e9'}
          size={24}
          style={{ cursor: 'pointer' }}
          onClick={() => handleRate(star)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
