const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')
const { Console } = require('console')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

router.get('/', async (req, res) => {
  res.send('All books')
})

router.get('/new', async (req, res) => {
  renderNewPage(res, new Book({}))
})

router.post('/', upload.single('cover'), async (req, res) => {
  const filename = req.file != null ? req.file.filename : null
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishedDate: new Date(req.body.publishedDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
    coverImageName: filename,
  })
  
  try {
    const newBook = await book.save()
  } catch (error) {
    console.log(error)
    renderNewPage(res, new Book({}), true)
  }
})

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError) params.errorMessage = 'Error Creating Book'
    res.render('books/new', params)
  } catch (error) {
    console.log(error)
    res.redirect('/books')
  }
}

module.exports = router
