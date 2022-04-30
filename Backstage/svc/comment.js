const mongoose = require('mongoose')

const Blog = require('../dao/blog.js')
const Comment = require('../dao/comment.js')

const { Types } = mongoose

const createComment = async (blogId, userId, content, replyTo) => {
  const blogObjectId = new Types.ObjectId(blogId)
  const blog = await Blog.findOne({ _id: blogObjectId })
  if (!blog) {
    return 'BlogNotFound'
  }
  blog.lastUpdate = new Date()

  const comment = new Comment({
    authorId: new Types.ObjectId(userId),
    blogId: blogObjectId,
    content,

    createdAt: new Date(),
    replyTo: replyTo ? new Types.ObjectId(replyTo) : null
  })

  await comment.save()
  await blog.save()
  return 'Success'
}

const deleteComment = async (commentId, userId) => {
  const commentObjectId = new Types.ObjectId(commentId)

  const comment = await Comment.findOne({ _id: commentObjectId })
  if (!comment) {
    return 'NotFound'
  }

  if (comment.authorId.toString() !== userId) {
    return 'Unauthorized'
  }

  await Comment.deleteOne({ _id: commentObjectId })
  await Comment.deleteMany({ replyTo: commentObjectId })

  return 'Success'
}

module.exports = {
  createComment,
  deleteComment
}
