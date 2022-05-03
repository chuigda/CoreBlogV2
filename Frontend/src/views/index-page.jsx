import React, {
  forwardRef, useEffect, useImperativeHandle, useMemo, useState
} from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { listBlog } from '../api'
import BlogCard from '../components/blog-card.jsx'

// eslint-disable-next-line react/prop-types
const IndexInner = ({ display }, ref) => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const [blogList, setBlogList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const loadBlogList = () => {
    listBlog(currentPage, 10, false).then(res => {
      if (!res.success) {
        enqueueSnackbar(t(res.messageId), { variant: 'error' })
        return
      }

      const { blogs } = res.data
      setBlogList(blogs)
    }).catch(() => enqueueSnackbar(t('Server.InternalError'), { variant: 'error' }))
  }

  useEffect(() => loadBlogList(1), [])

  useImperativeHandle(ref, () => ({
    loadBlogList
  }))

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
    <div style={{
      display: display ? 'flex' : 'none',
      flexDirection: 'column',
      rowGap: '14px'
    }}>
      { blogComponents }
    </div>
  )
}

const Index = forwardRef(IndexInner)

Index.propTypes = {
  display: PropTypes.any
}

export default Index
