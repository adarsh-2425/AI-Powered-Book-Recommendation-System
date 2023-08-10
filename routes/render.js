const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

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

// Render the registration form
router.get('/create', (req, res) => {
  res.render('createBook');
});

//Route to fetch the book and render the updatebook pug template
router.get('/update/:id', bookController.renderForUpdate);




module.exports = router;
