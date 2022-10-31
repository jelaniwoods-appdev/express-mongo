const express = require('express')
const router = express.Router()
const Author = require('../models/author')

router.get('/', (req, res) => {
  res.render('authors/index')
})

router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})

router.post('/create', (req, res) => {
  res.send('authors/create')
})

module.exports = router
