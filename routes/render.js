const express = require('express');
const router = express.Router();

// Render the login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Render the registration form
router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;
