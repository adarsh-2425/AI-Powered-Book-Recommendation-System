const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: function () {
      const indiaTimezoneOffset = 330; // India time zone offset in minutes
      const utcTimestamp = Date.now();
      const indiaTimestamp = utcTimestamp + indiaTimezoneOffset * 60 * 1000;
      return new Date(indiaTimestamp);
    },
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
