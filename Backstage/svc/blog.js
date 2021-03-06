const mongoose = require('mongoose')

const Blog = require('../dao/blog.js')
const Comment = require('../dao/comment.js')

const { Types } = mongoose

const createBlog = async (authorId, title, brief, content) => {
  const blog = new Blog({
    authorId: new Types.ObjectId(authorId),
    title,
    brief,
    content,

    createdAt: new Date(),
    lastUpdate: new Date()
  })

  const savedBlog = await blog.save()
  return savedBlog._id
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

const listBlogLookupPipeline = [
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
  { $unwind: { path: '$commentCount', preserveNullAndEmptyArrays: true } },
  { $unwind: { path: '$author' } }
]

const listBlog = async (page, pageSize, sortByLastUpdate) => {
  const sortPipeline = sortByLastUpdate
    ? [{ $sort: { lastUpdate: -1 } }]
    : [{ $sort: { createdAt: -1 } }]

  const blogs = await Blog.aggregate([
    ...listBlogLookupPipeline,
    ...sortPipeline,
    { $skip: (page - 1) * pageSize },
    { $limit: pageSize }
  ])
  return blogs
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

const searchBlogByTitle = async searchKey => {
  const blogs = await Blog.aggregate([
    {
      $match: {
        $or: [
          {
            title: {
              $regex: searchKey,
              $options: 'i'
            }
          },
          {
            brief: {
              $regex: searchKey,
              $options: 'i'
            }
          }
        ]
      }
    },
    ...listBlogLookupPipeline,
    { $sort: { lastUpdate: -1 } }
  ])
  return blogs
}

const searchBlogByContent = async searchKey => {
  const blogs = await Blog.aggregate([
    {
      $match: {
        $or: [
          {
            brief: {
              $regex: searchKey,
              $options: 'i'
            }
          },
          {
            content: {
              $regex: searchKey,
              $options: 'i'
            }
          }
        ]
      }
    },
    ...listBlogLookupPipeline,
    { $sort: { lastUpdate: -1 } }
  ])
  return blogs
}

module.exports = {
  createBlog,
  getBlog,
  countBlog,
  listBlog,
  updateBlog,
  deleteBlog,
  searchBlogByTitle,
  searchBlogByContent
}
