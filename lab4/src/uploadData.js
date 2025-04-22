import { db } from './firebase.js';
import { collection, setDoc, doc } from 'firebase/firestore';


import data from './data.json' 

async function uploadEvents() {
  try {
    const eventsCollection = collection(db, 'events');

    for (const event of data) {
      const eventRef = doc(eventsCollection, event.id);
      await setDoc(eventRef, event);
      console.log(`Завантажено: ${event.title}`);
    }

    console.log('Завантажено!');
  } catch (error) {
    console.error('Помилка при завантаженні:', error);
  }
}

uploadEvents();
