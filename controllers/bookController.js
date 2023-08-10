const mongoose = require('mongoose');
const Book = require('../models/Book');

// View Books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).render('books', { books }); // Render home.pug with the books data
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

// View Specific Book
exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if book available
    const isBookAvailable = await Book.findById(id);

    if (!isBookAvailable) {
      return res.status(404).json({ message: 'Book Not Found' });
    }

    const book = isBookAvailable;
    // Render viewBook.pug with the book data
    res.status(200).render('viewBook', { book });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
}


// Create Book Logic
exports.createBook = async (req, res) => {
  try {
    // const userId = req.user._id || "";

    const { title, author, genre, publishedYear, createdBy } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      publishedYear,
      createdBy,
    });

    await newBook.save();

    res.status(201).redirect('/books'); // Redirect to the book list
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Update Book Pug Rendering
exports.renderForUpdate = async (req, res) => {
  try {
    //console.log('update route accessed');
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.render('updateBook', { book });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message: 'Server Error'});
  }
}

// Update Book Logic
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if book is available
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book Not Found' });
    }

    const { title, author, genre, publishedYear } = req.body;

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.publishedYear = publishedYear;

    // Save book
    await book.save();

    res.redirect("/books");
    //res.status(201).redirect(`/books/${id}`); // Redirect to the updated book's view
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.deleteOne({ _id: id });

    // Check if the delete operation was successful
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book Not Available' });
    }

    res.status(200).json({ message: 'Book Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
}
