const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  userName: String,
  nickName: String,
  email: String,

  passwordHash: String,
  hashSalt: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
