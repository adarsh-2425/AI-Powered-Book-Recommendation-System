const express = require("express");
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const connectDb = require('./db.js');


//start mongoose
connectDb();

// Middleware for parsing JSON data
app.use(express.json());

// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Set up method-override middleware
app.use(methodOverride('_method'));

//pug middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Import and use the render routes
const renderRoutes = require('./routes/render.js');
app.use(renderRoutes);

//Import and use the Authentication Route
const authRoutes = require("./routes/authRoute.js");
app.use('/auth', authRoutes);

//Import and use the Book Route
const bookRoutes = require('./routes/bookRoute.js');
app.use('/books', bookRoutes);

  
  // Render the 'home.pug' template with the provided data

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong' });
});


const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`)
});