const { typeAssert } = require('./type-assert.cjs')

const isDevelopment = process.env.NODE_ENV === 'development'

const verifyBody = assertion => ({ body }, res, next) => {
  try {
    typeAssert(body, assertion)
  } catch (err) {
    if (isDevelopment) {
      res.status(400).send(err)
    } else {
      res.status(400).send('Bad request')
    }
    return
  }

  next()
}

const verifyQuery = assertion => ({ query }, res, next) => {
  try {
    typeAssert(query, assertion)
  } catch (err) {
    if (isDevelopment) {
      res.status(400).send(err)
    } else {
      res.status(400).send('Bad request')
    }
    return
  }

  next()
}

module.exports = {
  verifyBody,
  verifyQuery
}
