const Blog = require('../dao/blog')

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

module.exports = {
  createBlog
}
