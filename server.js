if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser') // included in express 4.16+

const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')
const booksRouter = require('./routes/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', error => console.log(error))
db.once('open', () => console.log('this world has been connected~'))

app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', booksRouter)

app.listen(process.env.PORT || 3000)
