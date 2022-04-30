const uuid = require('uuid').v4

const redisClient = require('./dao/redis')

// ========================================================
// access token creation
// ========================================================

const makeAccessToken = async userId => {
  const accessToken = uuid()
  await redisClient.set(accessToken, userId, { EX: 60 * 60 * 24 * 7 })

  return accessToken
}

// ========================================================
// middlewares
// ========================================================

const { typeAssert } = require('./util/typeAssert.cjs')
const config = require('./config')

const credAssertion = (() => {
  const ret = {}
  for (const cred of config.cfgAttr.creds) {
    ret[cred.header.toLowerCase()] = 'string'
  }
  return ret
})()

const userIdHeaderName = config.cfgAttr.creds[0].header.toLowerCase()
const accessTokenHeaderName = config.cfgAttr.creds[1].header.toLowerCase()

const privileged = async (req, res, next) => {
  try {
    typeAssert(req.headers, credAssertion)
  } catch (typeAssertError) {
    res.status(401).json({ success: false, message: typeAssertError })
    return
  }

  const auth = await redisClient.get(req.headers[accessTokenHeaderName])
  if (auth !== req.headers[userIdHeaderName]) {
    res.status(401).send('unauthorized')
    return
  }

  req.auth = {
    userId: req.headers[userIdHeaderName],
    accessToken: req.headers[accessTokenHeaderName],
  }

  next()
}

module.exports = {
  makeAccessToken,
  privileged
}
