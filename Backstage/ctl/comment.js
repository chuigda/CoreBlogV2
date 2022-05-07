const express = require('express')

const { privileged } = require('../auth.js')
const { objectId, nonEmtpyString } = require('../util/assertions.js')
const { createComment, deleteComment } = require('../svc/comment.js')
const { verifyBody } = require('../util/verify.js')

const router = express.Router()

const addCommentBodyAssertion = {
  blogId: objectId,
  content: nonEmtpyString,
  replyTo: objectId.orNull()
}

router.post('/comment', privileged, verifyBody(addCommentBodyAssertion), async (req, res) => {
  const { blogId, content, replyTo } = req.body
  const { userId } = req.auth

  const result = await createComment(blogId, userId, content, replyTo)
  res.json({
    success: result === 'Success',
    messageId: `Comment.Add.${result}`
  })
})

router.post('/delete', privileged, verifyBody({ commentId: objectId }), async (req, res) => {
  const { commentId } = req.body
  const { userId } = req.auth

  const result = await deleteComment(commentId, userId)
  res.json({
    success: result === 'Success',
    messageId: `Comment.Delete.${result}`
  })
})

module.exports = router
