const express = require('express')

const { privileged } = require('../auth.js')
const { typeAssert } = require('../util/type-assert.cjs')
const { createComment, deleteComment } = require('../svc/comment.js')

const router = express.Router()

router.post('/comment', privileged, async (req, res) => {
  try {
    typeAssert(req.body, {
      blogId: 'string',
      content: 'string',
      replyTo: 'string?'
    })
  } catch (e) {
    res.status(400).send()
    return
  }
  const { blogId, content, replyTo } = req.body
  const { userId } = req.auth

  const result = await createComment(blogId, userId, content, replyTo)
  res.json({
    success: result === 'Success',
    messageId: `Comment.Create.${result}`
  })
})

router.post('/delete', privileged, async (req, res) => {
  try {
    typeAssert(req.body, {
      commentId: 'string'
    })
  } catch (e) {
    res.status(400).send()
    return
  }
  const { commentId } = req.body
  const { userId } = req.auth

  const result = await deleteComment(commentId, userId)
  res.json({
    success: result === 'Success',
    messageId: `Comment.Delete.${result}`
  })
})

module.exports = router
