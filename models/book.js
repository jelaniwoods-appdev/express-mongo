const mongoose = require('mongoose')

const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishedDate: {
    type: Date,
    required: true
  },
  pageCount: {
    type: Number,
    required: true
  },
  coverImageName: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:  'Author' // must match the name
  },
  createdAt: {
    type: Number,
    type: Date,
    required: true,
    default: Date.now
  }
})

// name the model (table name), and schema to send to db
module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath
