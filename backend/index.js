const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const uuid = require('uuid').v4

const { privileged } = require('./auth.js')
const { requestDebug } = require('./util/request-debug.js')
const { typeAssert, enableChainAPI } = require('./util/typeAssert.cjs')
const cfgAttr = require('../src/config/cfgattr.json')
const config = require('./config')

enableChainAPI()

const fakeCred = (() => {
  const ret = {}
  for (const cred of cfgAttr.creds) {
    ret[cred.key] = uuid()
  }
  return ret
})()

const app = express()
const port = 3080

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(requestDebug)

app.post('/api/login', ({ body }, res) => {
  try {
    typeAssert(body, {
      userName: 'string'.chainWith(x => x.length !== 0 ? true : 'empty userName'),
      password: 'string'.chainWith(x => x.length !== 0 ? true : 'empty password')
    })
  } catch (typeAssertError) {
    console.log('type assertion failed: ', typeAssertError)
    res.json({ success: false, message: typeAssertError })
    return
  }

  res.json({ success: true, message: '', result: fakeCred })
})

app.get('/api/info', privileged, (req, res) => {
  res.json({ success: true, message: '', result: '1145141919810' })
})

app.get('/api/info2', privileged, (req, res) => {
  res.json({ success: true, message: '', result: uuid() })
})

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
