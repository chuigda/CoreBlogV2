const mongoose = require('mongoose')

const { Schema, Types } = mongoose

const blogSchema = new Schema({
  authorId: Types.ObjectId,
  title: String,
  brief: String,
  content: String,

  createdAt: Date,
  lastUpdate: Date
})

module.exports = mongoose.model('Blog', blogSchema)
