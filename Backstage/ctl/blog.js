const express = require('express')

const { typeAssert } = require('../util/type-assert.cjs')
const { intString, boolString } = require('../util/assertions.js')
const { privileged } = require('../auth.js')
const { createBlog, countBlog, getBlog, listBlog, updateBlog, deleteBlog } = require('../svc/blog.js')

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

router.get('/get', async (req, res) => {
  try {
    typeAssert(req.query, { blogId: 'string' })
  } catch (e) {
    res.status(400).send()
    return
  }
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
      data: blog
    })
  }
})

router.get('/list', async (req, res) => {
  try {
    typeAssert(req.query, {
      page: intString.chainWith(x => parseInt(x, 10) >= 1),
      pageSize: intString.chainWith(x => parseInt(x, 10) >= 1),
      sortByLastUpdate: boolString
    })
  } catch (e) {
    res.status(400).send()
    return
  }
  const { page: pageStr, pageSize: pageSizeStr, sortByLastUpdate } = req.query
  const page = parseInt(pageStr, 10)
  const pageSize = parseInt(pageSizeStr, 10)

  const blogs = await listBlog(page, pageSize, sortByLastUpdate === 'true')
  const totalCount = await countBlog()

  res.json({
    success: true,
    messageId: 'Blog.List.Success',
    data: {
      blogs,
      totalCount
    }
  })
})

router.post('/update', privileged, async (req, res) => {
  try {
    typeAssert(req.body, {
      blogId: 'string',
      newContent: 'string'
    })
  } catch (e) {
    res.status(400).send()
    return
  }
  const { blogId, newContent } = req.body
  const { userId } = req.auth

  const result = await updateBlog(blogId, userId, newContent)
  res.json({
    success: result === 'Success',
    messageId: `Blog.Update.${result}`
  })
})

router.post('/delete', privileged, async (req, res) => {
  try {
    typeAssert(req.body, {
      blogId: 'string'
    })
  } catch (e) {
    res.status(400).send()
    return
  }
  const { blogId } = req.body
  const { userId } = req.auth

  const result = await deleteBlog(blogId, userId)
  res.json({
    success: result === 'Success',
    messageId: `Blog.Delete.${result}`
  })
})

module.exports = router
