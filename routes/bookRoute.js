const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const mongoose = require('mongoose');
const Book = require('../models/Book');

//get books
router.get('/', bookController.getBooks);

//get a specific book
router.get('/:id', bookController.getBook);

// Route to render the "Add Book" page with the form
router.get('/create', (req, res) => {
  res.render('createBook') // Render the addbook.pug template
});

//create book
router.post('/create', bookController.createBook);

//Route to fetch the book and render the updatebook pug template
router.get('/update/:id', async (req, res) => {
  try {
    //console.log('update route accessed');
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.render('updateBook', { book });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Cannot update books right now')
  }
});
//Update Book
router.post('/update/:id', bookController.updateBook);

//Delete Book
router.delete('/delete/:id', bookController.deleteBook);
//64d1de600c14bd2e96964b97
module.exports = router;