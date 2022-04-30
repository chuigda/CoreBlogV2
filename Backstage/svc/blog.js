const mongoose = require('mongoose')

const Blog = require('../dao/blog')
const Comment = require('../dao/comment')

const { Types } = mongoose

const createBlog = async (authorId, title, content) => {
  const blog = new Blog({
    authorId: new Types.ObjectId(authorId),
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
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'blogId',
        as: 'comments',
        pipeline: [
          {
            $lookup: {
              from: 'users',
              localField: 'authorId',
              foreignField: '_id',
              as: 'author'
            }
          },
          { $unwind: { path: '$author' } }
        ]
      }
    },
    { $unwind: { path: '$author' } }
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
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'blogId',
        pipeline: [
          { $count: 'count' }
        ],
        as: 'commentCount'
      },
    },
    { $unwind: { path: '$commentCount' } },
    { $unwind: { path: '$author' } },
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
  const blogObjectId = new Types.ObjectId(blogId)

  const blog = await Blog.findOne({ _id: blogObjectId })
  if (!blog) {
    return 'NotFound'
  }

  if (blog.authorId.toString() !== userId) {
    return 'Unauthorized'
  }

  await Blog.deleteOne({ _id: blogObjectId })
  await Comment.deleteMany({ blogId: blogObjectId })
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
