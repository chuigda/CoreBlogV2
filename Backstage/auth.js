const uuid = require('uuid').v4

const redisClient = require('./db/redis')

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

const privileged = async (req, res, next) => {
  try {
    typeAssert(req.headers, credAssertion)
  } catch (typeAssertError) {
    res.status(401).json({ success: false, message: typeAssertError })
    return
  }

  const auth = await redisClient.get(req.headers.get(cfgAttr.creds[1].header))
  if (auth !== req.headers.get(cfgAttr.creds[0].header)) {
    res.status(401).send('unauthorized')
  }

  next()
}

module.exports = {
  makeAccessToken,
  privileged
}
