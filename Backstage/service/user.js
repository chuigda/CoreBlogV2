const md5 = require('md5')
const uuid = require('uuid').v4

const User = require('../dao/user')

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

const findUser = userName => User.findOne({ userName })

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

module.exports = {
  createUser,
  findUser,
  userLogin
}
