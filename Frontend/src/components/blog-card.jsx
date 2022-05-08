import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Stack, Card, CardContent, Tooltip
} from '@mui/material'
import Typography from '@mui/material/Typography'
import {
  Person, AccessTime, Edit, Visibility
} from '@mui/icons-material'
import MuiMarkdown from 'mui-markdown'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import XDivider from './divider.jsx'
import { prettyTime } from '../utils/prettyTime'

const BlogCard = ({
  blogId, author, title, brief, content, commentCount, createdAt, lastUpdate, isPreview
}) => {
  const { t } = useTranslation()

  const timeFmt = t('UI.Format.Time')
  const dateTimeFmt = t('UI.Format.DateTime')
  const yearDateTimeFmt = t('UI.Format.YearDateTime')

  return (
    <Card>
      <CardContent sx={{ paddingBottom: 16 }}>
        <Typography variant="h5"
                    component={isPreview ? Link : 'div'}
                    sx={{
                      textDecoration: 'none',
                      boxShadow: 'none',
                      ...(isPreview ? {
                        color: '#1976d2',
                        ':visited': {
                          color: '#1976d2'
                        },
                        ':hover': {
                          color: '#42a5f5'
                        },
                        ':visited:hover': {
                          color: '#42a5f5'
                        }
                      } : {})
                    }}
                    to={isPreview ? `/blog/${blogId}` : undefined}>
          {title}
        </Typography>
        <XDivider />
        {
          brief && <div style={{ marginBottom: 14 }}>
            <Typography variant="body1" sx={isPreview ? {
              maxHeight: '6em',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            } : {}}>
              {brief}
            </Typography>
          </div>
        }
        {
          !isPreview && <div style={{ marginBottom: 14 }} className="blog-content">
            <XDivider />
            <MuiMarkdown>
              {content}
            </MuiMarkdown>
          </div>
        }

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0, md: 4 }}>
          <div style={{ display: 'flex', columnGap: 4 }}>
            <Person />
            <Tooltip title={author}>
              <Typography component="div" sx={{
                display: 'inline',
                maxWidth: '200px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                { t('UI.Blog.Author') }
                { ': ' }
                { author }
              </Typography>
            </Tooltip>
          </div>
          <div style={{ display: 'flex', columnGap: 4 }}>
            <AccessTime />
            <Typography component="div" sx={{ display: 'inline' }}>
              { t('UI.Blog.CreateTime') }
              { ': ' }
              { prettyTime(createdAt, timeFmt, dateTimeFmt, yearDateTimeFmt) }
            </Typography>
          </div>
          <div style={{ display: 'flex', columnGap: 4 }}>
            <Edit />
            <Typography component="div" sx={{ display: 'inline' }}>
              { t('UI.Blog.UpdateTime') }
              { ': ' }
              { prettyTime(lastUpdate, timeFmt, dateTimeFmt, yearDateTimeFmt) }
            </Typography>
          </div>
          <div style={{ display: 'flex', columnGap: 4 }}>
            <Visibility />
            <Typography component="div" sx={{ display: 'inline' }}>
              { commentCount }
              &nbsp;
              { t('UI.Blog.CommentCount') }
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  )
}

BlogCard.propTypes = {
  blogId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  brief: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
  isPreview: PropTypes.bool.isRequired
}

export default BlogCard
