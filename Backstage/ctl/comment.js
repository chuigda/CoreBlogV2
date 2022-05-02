const express = require('express')

const { privileged } = require('../auth.js')
const { typeAssert } = require('../util/type-assert.cjs')
const { objectId } = require('../util/assertions.js')
const { createComment, deleteComment } = require('../svc/comment.js')

const router = express.Router()

const addCommentBodyAssertion = {
  blogId: objectId,
  content: 'string',
  replyTo: objectId.orNull()
}

router.post('/comment', privileged, async (req, res) => {
  try {
    typeAssert(req.body, addCommentBodyAssertion)
  } catch (e) {
    res.status(400).send()
    return
  }
  const { blogId, content, replyTo } = req.body
  const { userId } = req.auth

  const result = await createComment(blogId, userId, content, replyTo)
  res.json({
    success: result === 'Success',
    messageId: `Comment.Add.${result}`
  })
})

router.post('/delete', privileged, async (req, res) => {
  try {
    typeAssert(req.body, {
      commentId: objectId
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
