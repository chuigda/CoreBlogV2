const { typeAssert } = require('./util/typeAssert.cjs')
const redisClient = require('./db/redis')
const cfgAttr = require('../src/config/cfgattr.json')

const credAssertion = (() => {
  const ret = {}
  for (const cred of cfgAttr.creds) {
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

  const accessToken = await redisClient.hGetAll(req.headers.get(cfgAttr.creds[1].header))
  if (accessToken.userId !== req.headers.get(cfgAttr.creds[0].header)) {
    res.status(401).send('unauthorized')
  }

  next()
}

module.exports = {
  privileged
}
