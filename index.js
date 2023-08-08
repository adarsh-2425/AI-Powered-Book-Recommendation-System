const express = require("express");
const app = express();
const path = require('path');

const connectDb = require('./db.js');


//start mongoose
connectDb();

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: false }));

//pug middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Import and use the render routes
const renderRoutes = require('./routes/render.js');
app.use(renderRoutes);

//Authentication Route
const authRoutes = require("./routes/authRoute.js");
app.use('/auth', authRoutes);

//home path
app.get('/', (req, res) => {
  const pageTitle = 'Home Page';
  const welcomeMessage = 'Welcome to our website!';
  
  // Render the 'home.pug' template with the provided data
  res.render('home', { pageTitle, welcomeMessage });
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