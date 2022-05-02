import React from 'react'
import {
  Card, CardContent, Divider, IconButton, Typography
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation()

  const openGitHub = () => window.open('https://github.com/chuigda/CoreBlogV2')

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{ t('UI.About.Title') }</Typography>
        <Divider style={{
          marginTop: 4,
          marginBottom: 4
        }}/>
        <Typography variant="body1">{ t('UI.About.Content') }</Typography>
        <Typography variant="body1">
          { t('UI.About.Skills') }
          { ': ' }
          <span className="iconfont icon-node-js" />NodeJS &nbsp;
          <span className="iconfont icon-mongo-db" />MongoDB &nbsp;
          <span className="iconfont icon-redis" />Redis &nbsp;
          <span className="iconfont icon-react" />React &nbsp;
          <span className="iconfont icon-material-ui" />MaterialUI &nbsp;
        </Typography>
        <Typography variant="body1">
          { t('UI.About.Version.Frontend') }
          { ': ' }
          1.0.0-ALFA
        </Typography>
        <Typography variant="body1">
          { t('UI.About.Version.Backend') }
          { ': ' }
          1.0.0-ALFA
        </Typography>
        <Typography variant="body1">
          { t('UI.About.Bothering') }
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton size="large" onClick={openGitHub}>
            <GitHubIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  )
}

export default About
