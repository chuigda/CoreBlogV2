const express = require('express')

const { createUser, findUser, userLogin } = require('../service/user.js')
const { makeAccessToken } = require('../auth.js')
const config = require('../config')
const { typeAssert } = require('../util/typeAssert.cjs')

const router = express.Router()

const trimUserInfo = userInfo => ({
  userId: userInfo._id,
  userName: userInfo.userName,
  nickName: userInfo.nickName,
  email: userInfo.email
})

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
  }

  const { userName, nickName, password, email } = req.body
  await createUser(userName, nickName, password, email)

  res.json({
    success: true,
    messageId: 'User.CreateByAdmin.Success'
  })
})

router.get('/info', async (req, res) => {
  typeAssert(req.query, { userName: 'string' })

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
  typeAssert(req.body, { userName: 'string', password: 'string' })
  const { userName, password } = req.body

  const user = await userLogin(userName, password)
  if (!user) {
    res.json({
      success: false,
      messageId: 'User.Login.NotFound'
    })
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
