import React, { useContext, useRef, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Divider,
  Input,
  IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import XDivider from '../components/divider.jsx'
import UserContext from '../components/user-context'

const User = () => {
  const userContext = useContext(UserContext)
  const { t } = useTranslation()
  const history = useHistory()

  const back = () => history.goBack()
  const toLogin = () => history.replace('/login')

  if (!userContext.user) {
    return (
      <Dialog open={true}>
        <DialogTitle>
          { t('UI.User.DidYouLogin.Title') }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            { t('UI.User.DidYouLogin.Content') }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={back}>
            { t('UI.User.DidYouLogin.BackButton') }
          </Button>
          <Button onClick={toLogin}>
            { t('UI.User.DidYouLogin.LoginButton') }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const [editNickName, setEditNickName] = useState(false)
  const nickNameEditRef = useRef()

  const [editEmail, setEditEmail] = useState(false)
  const emailEditRef = useRef()

  const startEditNickName = () => setEditNickName(true)
  const doneEditNickName = () => {
    setEditNickName(false)

    // TODO
  }

  const startEditEmail = () => setEditEmail(true)
  const doneEditEmail = () => {
    setEditEmail(false)

    // TODO
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6">
            { t('UI.User.UserInfo') }
          </Typography>
          <XDivider />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(200px, 1fr) 3fr 40px',
            gridTemplateRows: '32px 32px 32px',
            columnGap: 4,
          }}>
            <Typography component="span">
              { t('UI.User.UserName') }
            </Typography>
            <Typography component="span">
              { userContext.user.userName }
            </Typography>
            <div/>

            <Typography component="span">
              { t('UI.User.NickName') }
            </Typography>
            {
              editNickName
                ? <Input placeholder={ t('UI.User.NickName') }
                         defaultValue={ userContext.user.nickName }
                         inputRef={ nickNameEditRef }
                  />
                : <Typography component="span">{ userContext.user.nickName }</Typography>
            }
            {
              editNickName
                ? <IconButton onClick={doneEditNickName}>
                    <SaveIcon />
                  </IconButton>
                : <IconButton onClick={startEditNickName}>
                    <EditIcon />
                  </IconButton>
            }

            <Typography component="span">
              { t('UI.User.Email') }
            </Typography>
            {
              editEmail
                ? <Input placeholder={ t('UI.User.Email') }
                         defaultValue={ userContext.user.email }
                         inputRef={ emailEditRef }
                />
                : <Typography component="span">{ userContext.user.email }</Typography>
            }
            {
              editEmail
                ? <IconButton onClick={doneEditEmail}>
                    <SaveIcon />
                  </IconButton>
                : <IconButton onClick={startEditEmail}>
                    <EditIcon />
                  </IconButton>
            }
          </div>
          <Divider style={{ marginTop: 12, marginBottom: 12 }} />
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button variant="contained">修改密码</Button>
            <Button variant="contained" color="error">注销登录</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default User
