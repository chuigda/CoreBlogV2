import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { withSnackbar } from 'notistack'

import { getBlog } from '../api'
import BlogCard from '../components/blog-card.jsx'

const BlogRead = ({ enqueueSnackbar }) => {
  const { t } = useTranslation()
  const { blogId } = useParams()

  const [blog, setBlog] = useState(null)

  useEffect(() => {
    getBlog(blogId).then(res => {
      if (!res.success) {
        enqueueSnackbar(t(res.messageId), { variant: 'error' })
        return
      }

      setBlog(res.data)
    })
  }, [])

  const blogCard = useMemo(() => (blog
    ? (
      <BlogCard createdAt={blog.createdAt}
                title={blog.title}
                lastUpdate={blog.lastUpdate}
                commentCount={blog.commentCount}
                isPreview={false}
                blogId={blog.blogId}
                content={blog.content} />
    ) : null), [blog])

  return (
    <div>
      { blogCard }
    </div>
  )
}

BlogRead.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
}

export default withSnackbar(BlogRead)
