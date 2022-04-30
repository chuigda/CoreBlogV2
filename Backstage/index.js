const cors = require('cors')
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const { requestDebug } = require('./util/request-debug.js')
const { enableChainAPI } = require('./util/type-assert.cjs')
const config = require('./config')

// ========================================================
// express configuration
// ========================================================

enableChainAPI()

const app = express()
const { port } = config

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride())
app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(500).send('Internal server error')
})

if (process.env.NODE_ENV === 'development') {
  app.use(requestDebug)
}

// ========================================================
// router registration
// ========================================================

app.use('/api/user', require('./ctl/user.js'))
app.use('/api/blog', require('./ctl/blog.js'))

// ========================================================
// start application
// ========================================================

const applicationStart = async () => {
  await mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`)
  console.log('[app] connected to mongodb')

  app.listen(port, () => {
    console.log('[app] application started')
  })
}

applicationStart()
  .then(() => {})
  .catch(err => console.error('[app] application failed to start: ', err))
