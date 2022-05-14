const md5 = require('md5')
const uuid = require('uuid').v4
const { Types } = require('mongoose')

const User = require('../dao/user.js')

const hashPassword = (userName, password, hashSalt) => md5(userName + md5(password + hashSalt) + hashSalt)

const createUser = async (userName, nickName, password, email) => {
  const hashSalt = uuid()
  const passwordHash = hashPassword(userName, password, hashSalt)
  const user = new User({
    userName,
    nickName,
    email,

    passwordHash,
    hashSalt
  })

  await user.save()
}

const findUser = async userName => {
  const user = await User.findOne({ userName })
  return user.toObject()
}

const userLogin = async (userName, password) => {
  const user = await User.findOne({ userName })
  if (!user) {
    return null
  }

  const passwordHash = hashPassword(userName, password, user.hashSalt)
  if (passwordHash !== user.passwordHash) {
    return null
  }

  return user
}

const editUserNickname = async (userId, nickName) => {
  const user = await User.findOne({ _id: new Types.ObjectId(userId) })
  if (!user) {
    return false
  }

  user.nickName = nickName
  await user.save()
  return true
}

const editUserEmail = async (userId, email) => {
  const user = await User.findOne({ _id: new Types.ObjectId(userId) })
  if (!user) {
    return false
  }

  user.email = email
  await user.save()
  return true
}

const editUserPassword = async (userId, password) => {
  const user = await User.findOne({ _id: new Types.ObjectId(userId) })
  if (!user) {
    return false
  }

  const hashSalt = uuid()
  user.passwordHash = hashPassword(user.userName, password, hashSalt)
  user.hashSalt = hashSalt
  await user.save()
  return true
}

const searchUserByName = async name => {
  const user = await User.find({
    $or: [
      {
        userName: {
          $regex: name,
          $options: 'i'
        }
      },
      {
        nickName: {
          $regex: name,
          $options: 'i'
        }
      }
    ]
  })
  return user.map(item => item.toObject())
}

module.exports = {
  createUser,
  findUser,
  userLogin,
  editUserNickname,
  editUserEmail,
  editUserPassword,
  searchUserByName
}
