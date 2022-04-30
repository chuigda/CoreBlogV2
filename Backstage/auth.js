const mongoose = require('mongoose')
const redisClient = require('./db/redis')

// middlewares
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
  privileged
}
