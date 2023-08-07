const express = require("express");
const app = express();

const connectDb = require('./db.js');

//routes
const authRoutes = require("./routes/authRoute.js");

//start mongoose
connectDb();

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: false }));

//Authentication Route
app.use('/auth', authRoutes);

//home path
app.get('/', (req, res) => {
  res.send("Welcome to AI-Powered Book Recommendation System");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});


const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`)
});