const cfgAttr = require('../../cfgAttr/index.json')
const { typeAssert } = require('../util/type-assert.cjs')

const configAssertion = {
  addr: 'string',
  port: 'number',
  authToken: 'string',
  redis: {
    host: 'string',
    port: 'number'
  },
  mongo: {
    host: 'string',
    port: 'number',
    db: 'string'
  }
}

try {
  if (process.env.NODE_ENV === 'production') {
    const config = require('./config.prod.js')
    typeAssert(config, configAssertion)

    module.exports = { ...config, cfgAttr }
  } else {
    const config = require('./config.dev.js')
    typeAssert(config, configAssertion)

    module.exports = { ...config, cfgAttr }
  }
} catch (e) {
  console.error('[config] type assertion failure:', e)
  process.exit(-1)
}
