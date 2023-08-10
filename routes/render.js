const express = require('express');
const router = express.Router();

// Render the home page
router.get('/', (req, res) => {
  res.render('home');
});

// Render the login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Render the registration form
router.get('/register', (req, res) => {
  res.render('register');
});

//update books




module.exports = router;
