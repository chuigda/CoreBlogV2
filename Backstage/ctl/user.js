const express = require('express')

const { createUser, findUser, userLogin } = require('../svc/user.js')
const { makeAccessToken } = require('../auth.js')
const { trimUserInfo } = require('../svc/trim.js')
const { typeAssert } = require('../util/type-assert.cjs')
const config = require('../config')

const router = express.Router()

router.post('/createUserAdmin', async (req, res) => {
  try {
    typeAssert(req.body, {
      authToken: 'string'.assertValue(config.authToken),
      userName: 'string',
      nickName: 'string',
      password: 'string',
      email: 'string'
    })
  } catch (typeAssertError) {
    res.send({
      success: false,
      messageId: 'User.CreateByAdmin.BadToken'
    })
    return
  }

  const { userName, nickName, password, email } = req.body
  await createUser(userName, nickName, password, email)

  res.json({
    success: true,
    messageId: 'User.CreateByAdmin.Success'
  })
})

router.get('/info', async (req, res) => {
  try {
    typeAssert(req.query, { userName: 'string' })
  } catch (e) {
    res.status(400).send()
    return
  }

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

router.post('/login', async (req, res) => {
  try {
    typeAssert(req.body, { userName: 'string', password: 'string' })
  } catch (e) {
    res.status(400).send()
    return
  }
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

module.exports = router
