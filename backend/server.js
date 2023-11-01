require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes");

// Express App
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for Requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening for port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
