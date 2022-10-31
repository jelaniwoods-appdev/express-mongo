const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

// name the model (table name), and schema to send to db
module.exports = mongoose.model('Author', authorSchema)
