const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  userName: String,
  nickName: String,
  email: String,
  _id: String,

  passwordHash: String,
  hashSalt: String
})

module.exports = mongoose.model('User', userSchema)
