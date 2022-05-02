import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { withSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { listBlog } from '../api'
import BlogCard from '../components/blog-card.jsx'

const Index = ({ enqueueSnackbar }) => {
  const { t } = useTranslation()
  const [blogList, setBlogList] = useState([])

  useEffect(() => {
    listBlog(1, 10, false).then(res => {
      if (!res.success) {
        enqueueSnackbar(t(res.messageId), { variant: 'error' })
        return
      }

      const { blogs } = res.data
      setBlogList(blogs)
    })
  }, [])

  const blogComponents = useMemo(() => blogList.map((x, idx) => (
    <BlogCard blogId={x.blogId}
              author={x.author.userName}
              createdAt={x.createdAt}
              commentCount={x.commentCount}
              lastUpdate={x.lastUpdate}
              content={x.content}
              title={x.title}
              isPreview={true}
              key={`blog-preview-${idx}`}
    />
  )), [blogList])

  return (
    <div>
      { blogComponents }
    </div>
  )
}

Index.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
}

export default withSnackbar(Index)
