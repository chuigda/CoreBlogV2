const mongoose = require('mongoose')

const { Schema } = mongoose

const blogSchema = new Schema({
  authorId: String,
  title: String,
  content: String,

  createdAt: Date,
  lastUpdate: Date
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
