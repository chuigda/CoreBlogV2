import React from 'react'
import PropTypes from 'prop-types'
import {
  Stack, Card, CardContent, Divider
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { AccessTime, Edit, Visibility } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

import { prettyTime } from '../utils/prettyTime'

const BlogCard = ({
  title, content, commentCount, createdAt, lastUpdate, isPreview
}) => {
  const { t } = useTranslation()

  const timeFmt = t('UI.Format.Time')
  const dateTimeFmt = t('UI.Format.DateTime')
  const yearDateTimeFmt = t('UI.Format.YearDateTime')

  return (
    <Card>
      <CardContent sx={{
        '& > MuiCardContent-root': {
          paddingBottom: 16
        }
      }
      }>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Divider style={{
          marginTop: 4,
          marginBottom: 4
        }}/>
        <Typography variant="body1"
                    component="div"
                    sx={isPreview ? {
                      maxHeight: 120,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    } : {}}
                    gutterBottom>
          {content}
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0, md: 4 }}>
          <div style={{ display: 'flex', columnGap: 4 }}>
            <AccessTime />
            <Typography component="div" sx={{ display: 'inline' }}>
              { t('UI.Blog.CreateTime') }
              &nbsp;
              { prettyTime(createdAt, timeFmt, dateTimeFmt, yearDateTimeFmt) }
            </Typography>
          </div>
          <div style={{ display: 'flex', columnGap: 4 }}>
            <Edit />
            <Typography component="div" sx={{ display: 'inline' }}>
              { t('UI.Blog.UpdateTime') }
              &nbsp;
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
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
  isPreview: PropTypes.bool.isRequired
}

export default BlogCard
