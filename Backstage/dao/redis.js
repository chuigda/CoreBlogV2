const { createClient } = require('redis')

const config = require('../config')

const client = createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port
  }
})

client.on('error', err => console.error('[redis] error:', err))

client.connect().then(() => {
  console.log('[redis] connected')
}).catch(err => {
  console.error('[redis] redis connection error:', err)
  process.exit(-1)
})

module.exports = client
