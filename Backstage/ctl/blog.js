const express = require('express')

const { intString, boolString, objectId, nonEmtpyString } = require('../util/assertions.js')
const { privileged } = require('../auth.js')
const { createBlog, countBlog, getBlog, listBlog, updateBlog, deleteBlog } = require('../svc/blog.js')
const { trimBlogInfo } = require('../svc/trim.js')
const { verifyBody, verifyQuery } = require('../util/verify.js')

const router = express.Router()

router.post(
  '/add',
  privileged,
  verifyBody({
    title: nonEmtpyString,
    brief: nonEmtpyString,
    content: nonEmtpyString,
  }),
  async (req, res) => {
    const { title, brief, content } = req.body
    const { userId } = req.auth

    const blogId = await createBlog(userId, title, brief, content)
    res.json({
      success: true,
      messageId: 'Blog.Add.Success',
      data: {
        blogId
      }
    })
  }
)

router.get('/get', verifyQuery({ blogId: objectId }), async (req, res) => {
  const { blogId } = req.query

  const blog = await getBlog(blogId)
  if (!blog) {
    res.json({
      success: false,
      messageId: 'Blog.Get.NotFound',
    })
  } else {
    res.json({
      success: true,
      messageId: 'Blog.Get.Success',
      data: trimBlogInfo(blog)
    })
  }
})

router.get(
  '/list',
  verifyQuery({
    page: intString.chainWith(x => parseInt(x, 10) >= 1),
    pageSize: intString.chainWith(x => parseInt(x, 10) >= 1),
    sortByLastUpdate: boolString
  }),
  async (req, res) => {
    const { page: pageStr, pageSize: pageSizeStr, sortByLastUpdate } = req.query

    const blogs = await listBlog(
      parseInt(pageStr, 10),
      parseInt(pageSizeStr, 10),
      sortByLastUpdate === 'true'
    )
    const totalCount = await countBlog()

    res.json({
      success: true,
      messageId: 'Blog.List.Success',
      data: {
        blogs: blogs.map(trimBlogInfo),
        totalCount
      }
    })
  }
)

router.post(
  '/update',
  privileged,
  verifyBody({
    blogId: objectId,
    newContent: nonEmtpyString
  }),
  async (req, res) => {
    const { blogId, newContent } = req.body
    const { userId } = req.auth

    const result = await updateBlog(blogId, userId, newContent)
    res.json({
      success: result === 'Success',
      messageId: `Blog.Update.${result}`
    })
  }
)

router.post('/delete', privileged, verifyBody({ blogId: objectId }), async (req, res) => {
  const { blogId } = req.body
  const { userId } = req.auth

  const result = await deleteBlog(blogId, userId)
  res.json({
    success: result === 'Success',
    messageId: `Blog.Delete.${result}`
  })
})

module.exports = router
