const express = require('express')

const { typeAssert } = require('../util/typeAssert.cjs')
const { privileged } = require('../auth.js')
const { createBlog } = require('../svc/blog.js')

const router = express.Router()

router.post('/add', privileged, async (req, res) => {
  try {
    typeAssert(req.body, {
      title: 'string',
      content: 'string',
    })
  } catch (e) {
    res.status(400).send()
  }
  const { title, content } = req.body
  const { userId } = req.auth

  const blogId = await createBlog(userId, title, content)
  res.json({
    success: true,
    messageId: 'Blog.Add.Success',
    data: {
      blogId
    }
  })
})

module.exports = router
