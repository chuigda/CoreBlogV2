const mongoose = require('mongoose')

const { Schema, Types } = mongoose

const commentSchema = new Schema({
  authorId: Types.ObjectId,
  blogId: Types.ObjectId,

  content: String,
  createdAt: Date,
  replyTo: Types.ObjectId
})

module.exports = mongoose.model('Comment', commentSchema)
