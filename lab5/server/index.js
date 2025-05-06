const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: '../.env' });
const db = require("./firebaseAdmin");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/events", async (req, res) => {
  try {
    const snapshot = await db.collection("events").get();
    const today = new Date().toISOString();

    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(e => e.date >= today);
    res.json(events);
  } catch (error) {
    console.error("Помилка отримання подій:", error);
    res.status(500).json({ error: "Помилка отримання подій" });
  }
});

app.get("/api/ratings/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const { pageSize = 10, lastVisible } = req.query;

  try {
    let query = db.collection("ratings")
      .where("eventId", "==", eventId)
      .limit(Number(pageSize));

    if (lastVisible) {
      const lastDoc = await db.collection("ratings").doc(lastVisible).get();
      if (lastDoc.exists) {
        query = query.startAfter(lastDoc);
      }
    }

    const snapshot = await query.get();
    const ratings = snapshot.docs.map(doc => ({
      id: doc.id, ...doc.data()
    }));

    const avgSnapshot = await db.collection("ratings").where("eventId", "==", eventId).get();
    const allRatings = avgSnapshot.docs.map(doc => doc.data());
    const avg = allRatings.length
      ? allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length : 0;

    res.json({
      average: avg.toFixed(1),
      ratings,
      lastVisible: snapshot.docs.length ? snapshot.docs[snapshot.docs.length - 1].id : null,
      hasMore: snapshot.docs.length === Number(pageSize)
    });
  } catch (err) {
    console.error("Error fetching paginated ratings:", err);
    res.status(500).json({ error: "Помилка отримання оцінок" });
  }
});
 
app.post("/api/ratings", async (req, res) => {
    const { eventId, rating, userId } = req.body;
    if (!eventId || !rating || !userId) {
      return res.status(400).json({ error: "Неповні дані" });
    }
  
    try {
      const docId = `${userId}_${eventId}`;
      await db.collection("ratings").doc(docId).set({eventId, rating, userId, updatedAt: new Date()
      });
      res.status(201).json({ message: "Оцінку збережено" });
    } catch (err) {
      res.status(500).json({ error: "Помилка збереження оцінки" });
    }
});
  
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));