import React, {
  forwardRef, useEffect, useImperativeHandle, useMemo, useState, useContext
} from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { listBlog } from '../api'
import BlogCard from '../components/blog-card.jsx'
import ContainerContext from '../components/container-context'
import { getSessionStorage } from '../utils/localStorage'
import { Button, Typography } from '@mui/material'

// eslint-disable-next-line react/prop-types
const IndexInner = ({ display }, ref) => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const [blogList, setBlogList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMoreContent, setHasMoreContent] = useState(false)
  const containerContext = useContext(ContainerContext)

  const loadBlogList = () => {
    listBlog(currentPage, 10, false).then(({ success, messageId, data }) => {
      if (!success) {
        enqueueSnackbar(t(messageId), { variant: 'error' })
        return
      }

      const { blogs, totalCount } = data
      setBlogList(blogs)
      setHasMoreContent(blogs.length < totalCount)
    }).catch(() => enqueueSnackbar(t('Server.InternalError'), { variant: 'error' }))
  }

  useEffect(() => loadBlogList(1), [])

  useEffect(() => {
    if (display) {
      const scrollPosition = getSessionStorage('UI.ScrollPosition')
      if (scrollPosition && containerContext.current) {
        containerContext.current.scrollTo(0, scrollPosition)
      }
    }
  }, [display])

  useImperativeHandle(ref, () => ({
    loadBlogList
  }))

  const blogComponents = useMemo(() => blogList.map((x, idx) => (
    <BlogCard blogId={x.blogId}
              author={x.author.nickName}
              brief={x.brief}
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
      { hasMoreContent
        ? <Button sx={{ alignSelf: 'center' }}>
            { t('UI.Index.LoadMore') }
          </Button>
        : <Typography variant="body2"
                      sx={{ alignSelf: 'center' }}>
            { t('UI.Index.NoMoreContent') }
          </Typography>
      }
    </div>
  )
}

const Index = forwardRef(IndexInner)

Index.propTypes = {
  display: PropTypes.any
}

export default Index
