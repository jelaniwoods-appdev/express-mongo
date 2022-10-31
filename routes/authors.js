const express = require('express')
const router = express.Router()
const Author = require('../models/author')

router.get('/', (req, res) => {
  res.render('authors/index')
})

router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})

router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  })

  try {
    const newAuthor = await author.save()
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect('/')
  } catch (error) {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error happened'
    })
  }
  // bc mongodb operates asyncronously
})

module.exports = router
