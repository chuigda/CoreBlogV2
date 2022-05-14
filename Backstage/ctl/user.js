const express = require('express')

const {
  createUser, findUser, userLogin, editUserNickname, editUserEmail, editUserPassword, searchUserByName
} = require('../svc/user.js')
const { makeAccessToken } = require('../auth.js')
const { trimUserInfo } = require('../svc/trim.js')
const { verifyBody, verifyQuery } = require('../util/verify.js')
const config = require('../config')
const { privileged } = require('../auth')
const { nonEmptyString, emailString, passwordString } = require('../util/assertions.js')

const router = express.Router()

const createUserAssertion = {
  authToken: 'string'.assertValue(config.authToken),
  userName: nonEmptyString,
  nickName: nonEmptyString,
  password: passwordString,
  email: emailString
}

router.post('/createUserAdmin', verifyBody(createUserAssertion), async (req, res) => {
  const { userName, nickName, password, email } = req.body
  await createUser(userName, nickName, password, email)

  res.json({
    success: true,
    messageId: 'User.CreateByAdmin.Success'
  })
})

router.get('/info', verifyQuery({ userName: 'string' }), async (req, res) => {
  const user = await findUser(req.query.userName)
  if (!user) {
    res.json({
      success: false,
      messageId: 'User.Info.NotFound'
    })
  }

  res.json({
    success: true,
    messageId: 'User.Info.Success',
    data: trimUserInfo(user)
  })
})

router.post('/login', verifyBody({ userName: 'string', password: 'string' }), async (req, res) => {
  const { userName, password } = req.body

  const user = await userLogin(userName, password)
  if (!user) {
    res.json({
      success: false,
      messageId: 'User.Login.NotFound'
    })
    return
  }

  const accessToken = await makeAccessToken(user._id)
  res.json({
    success: true,
    messageId: 'User.Login.Success',
    data: {
      accessToken,
      user: trimUserInfo(user)
    }
  })
})

router.post(
  '/changeNickName',
  privileged,
  verifyBody({ nickName: nonEmptyString }),
  async (req, res) => {
    const { nickName } = req.body
    const { userId } = req.auth

    if (await editUserNickname(userId, nickName)) {
      res.json({
        success: true,
        messageId: 'User.Edit.Success'
      })
    } else {
      res.json({
        success: false,
        messageId: 'User.Edit.Failed'
      })
    }
  }
)

router.post(
  '/changeEmail',
  privileged,
  verifyBody({ email: emailString }),
  async (req, res) => {
    const { email } = req.body
    const { userId } = req.auth

    if (await editUserEmail(userId, email)) {
      res.json({
        success: true,
        messageId: 'User.Edit.Success'
      })
    } else {
      res.json({
        success: false,
        messageId: 'User.Edit.Failed'
      })
    }
  }
)

router.post(
  '/changePassword',
  privileged,
  verifyBody({ password: passwordString }),
  async (req, res) => {
    const { password } = req.body
    const { userId } = req.auth

    if (await editUserPassword(userId, password)) {
      res.json({
        success: true,
        messageId: 'User.Edit.Success'
      })
    } else {
      res.json({
        success: false,
        messageId: 'User.Edit.Failed'
      })
    }
  }
)

router.get(
  '/search',
  verifyQuery({ userName: nonEmptyString }),
  async (req, res) => {
    const { userName } = req.query

    const users = await searchUserByName(userName)
    res.json({
      success: true,
      messageId: 'User.Search.Success',
      data: users.map(trimUserInfo)
    })
  }
)

module.exports = router
