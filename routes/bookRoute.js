const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');


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

router.get('/update/:id', bookController.renderForUpdate);

//Update Book
router.post('/update/:id', bookController.updateBook);

//Delete Book
router.delete('/delete/:id', bookController.deleteBook);

module.exports = router;