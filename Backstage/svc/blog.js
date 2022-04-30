const mongoose = require('mongoose')

const Blog = require('../dao/blog')

const { Types } = mongoose

const createBlog = async (authorId, title, content) => {
  const blog = new Blog({
    authorId,
    title,
    content,

    createdAt: new Date(),
    lastUpdate: new Date()
  })

  await blog.save()
  return blog._id
}

const getBlog = async blogId => {
  const blog = await Blog.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(blogId)
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'author'
      }
    }
  ])

  return blog[0]
}

const countBlog = () => Blog.countDocuments()

const listBlog = (page, pageSize, sortByLastUpdate) => {
  const sortPipeline = sortByLastUpdate
    ? [{ $sort: { lastUpdate: -1 } }]
    : [{ $sort: { createdAt: -1 } }]

  return Blog.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'author'
      }
    },
    ...sortPipeline,
    { $skip: (page - 1) * pageSize },
    { $limit: pageSize }
  ])
}

const updateBlog = async (blogId, userId, newContent) => {
  const blog = await Blog.findOne({ _id: blogId })
  if (!blog) {
    return 'NotFound'
  }

  if (blog.authorId.toString() !== userId) {
    return 'Unauthorized'
  }

  blog.content = newContent
  blog.lastUpdate = new Date()
  await blog.save()
  return 'Success'
}

const deleteBlog = async (blogId, userId) => {
  const blog = await Blog.findOne({ _id: blogId })
  if (!blog) {
    return 'NotFound'
  }

  if (blog.authorId.toString() !== userId) {
    return 'Unauthorized'
  }

  await Blog.deleteOne({ _id: blogId })
  return 'Success'
}

module.exports = {
  createBlog,
  getBlog,
  countBlog,
  listBlog,
  updateBlog,
  deleteBlog
}
