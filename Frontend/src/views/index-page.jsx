/* eslint-disable react/prop-types */
import React, {
  forwardRef, useEffect, useImperativeHandle, useMemo, useContext
} from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'
import { Button, Typography } from '@mui/material'

import { listBlog } from '../api'
import BlogCard from '../components/blog-card.jsx'
import ContainerContext from '../components/container-context'

const IndexInner = ({ bundle }, ref) => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  const {
    scroll,
    setScroll,
    initialized,
    setInitialized,
    blogList,
    setBlogList,
    currentPage,
    setCurrentPage,
    hasMoreContent,
    setHasMoreContent
  } = bundle
  const containerContext = useContext(ContainerContext)

  const loadInitBlogList = () => {
    setCurrentPage(1)
    listBlog(1, 10, false).then(({ success, messageId, data }) => {
      if (!success) {
        enqueueSnackbar(t(messageId), { variant: 'error' })
        return
      }

      const { blogs, totalCount } = data
      setBlogList(blogs)
      setHasMoreContent(blogs.length < totalCount)
    }).catch(() => enqueueSnackbar(t('Server.InternalError'), { variant: 'error' }))
  }

  const loadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    listBlog(nextPage, 10, false).then(({ success, messageId, data }) => {
      if (!success) {
        enqueueSnackbar(t(messageId), { variant: 'error' })
        return
      }

      const { blogs, totalCount } = data
      setBlogList([...blogList, ...blogs])
      setHasMoreContent(currentPage * 10 + blogs.length < totalCount)
    })
  }

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)
      loadInitBlogList()
    }
  }, [])

  const handleScroll = () => {
    const scrollPosition = containerContext.current.scrollTop
    setScroll(scrollPosition)
  }

  useEffect(() => {
    containerContext.current.scrollTo(0, scroll)
    containerContext.current.addEventListener('scroll', handleScroll)
    return () => containerContext.current.removeEventListener('scroll', handleScroll)
  }, [])

  useImperativeHandle(ref, () => ({ loadInitBlogList }))

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
      display: 'flex',
      flexDirection: 'column',
      rowGap: '14px'
    }}>
      { blogComponents }
      { hasMoreContent
        ? <Button sx={{ alignSelf: 'center' }} onClick={loadMore}>
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
  bundle: PropTypes.shape({
    scroll: PropTypes.number.isRequired,
    setScroll: PropTypes.func.isRequired,
    initialized: PropTypes.bool.isRequired,
    setInitialized: PropTypes.func.isRequired,
    blogList: PropTypes.array.isRequired,
    setBlogList: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    hasMoreContent: PropTypes.bool.isRequired,
    setHasMoreContent: PropTypes.func.isRequired
  }).isRequired
}

export default Index
