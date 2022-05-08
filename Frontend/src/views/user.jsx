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
  IconButton,
  TextField
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import XDivider from '../components/divider.jsx'
import UserContext from '../components/user-context'
import { setLocalStorage } from '../utils/localStorage'
import { purgeCreds } from '../utils/credUtil'
import { changeEmail, changeNickName, changePassword } from '../api'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const emailRegex = /^[^@]+@[^@]+\.[^@]+$/

const spanNoLineBreak = {
  display: 'inline',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const User = () => {
  const userContext = useContext(UserContext)
  const { t } = useTranslation()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

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
    const nickName = nickNameEditRef.current.value
    if (nickName === userContext.user.nickName) {
      setEditNickName(false)
      return
    }

    if (nickName.length === 0) {
      enqueueSnackbar(t('UI.User.BadNickName'), { variant: 'error' })
      return
    }

    changeNickName(nickName).then(({ success, messageId }) => {
      setEditNickName(false)
      enqueueSnackbar(t(messageId), { variant: success ? 'success' : 'error' })

      if (success) {
        const newUserInfo = { ...userContext.user, nickName }
        userContext.setUser(newUserInfo)
        setLocalStorage('User.Info', JSON.stringify(newUserInfo))
      }
    })
  }

  const startEditEmail = () => setEditEmail(true)
  const doneEditEmail = () => {
    const email = emailEditRef.current.value
    if (email === userContext.user.email) {
      setEditEmail(false)
      return
    }

    if (!emailRegex.test(email)) {
      enqueueSnackbar(t('UI.User.BadEmail'), { variant: 'error' })
      return
    }

    changeEmail(email).then(({ success, messageId }) => {
      setEditEmail(false)
      enqueueSnackbar(t(messageId), { variant: success ? 'success' : 'error' })

      if (success) {
        const newUserInfo = { ...userContext.user, email }
        userContext.setUser(newUserInfo)
        setLocalStorage('User.Info', JSON.stringify(newUserInfo))
      }
    })
  }

  const [openLogout, setOpenLogout] = useState(false)
  const closeLogout = () => setOpenLogout(false)
  const openLogoutDialog = () => setOpenLogout(true)
  const confirmLogout = () => {
    enqueueSnackbar(t('UI.User.LogoutSuccess'), { variant: 'success' })

    setLocalStorage('User.Info', null)
    purgeCreds()
    userContext.setUser(null)
    history.replace('/')
  }

  const passwordEditRef = useRef()
  const confirmPasswordEditRef = useRef()
  const [openChangePassword, setOpenChangePassword] = useState(false)
  const closeChangePassword = () => setOpenChangePassword(false)
  const openChangePasswordDialog = () => setOpenChangePassword(true)
  const confirmChangePassword = () => {
    const password = passwordEditRef.current.value
    const confirmPassword = confirmPasswordEditRef.current.value

    if (password !== confirmPassword) {
      enqueueSnackbar(t('UI.User.UnequalPassword'), { variant: 'error' })
      return
    }

    if (!passwordRegex.test(password)) {
      enqueueSnackbar(t('UI.User.BadPassword'), { variant: 'error' })
      return
    }

    changePassword(password).then(({ success, messageId }) => {
      setOpenChangePassword(false)
      enqueueSnackbar(t(messageId), { variant: success ? 'success' : 'error' })
    })
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
            gridTemplateColumns: 'minmax(100px, 1fr) minmax(0, 300px) 32px',
            gridTemplateRows: '32px 32px 32px',
            columnGap: 4,
          }}>
            <Typography variant="body1" component="span">
              { t('UI.User.UserName') }
            </Typography>
            <Typography variant="body1" component="span" sx={spanNoLineBreak}>
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
                         sx={{ padding: 0, margin: 0 }}
                  />
                : <Typography component="span" sx={spanNoLineBreak}>
                    { userContext.user.nickName }
                  </Typography>
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
                         sx={{ padding: 0, margin: 0, width: '100%' }}
                />
                : <Typography component="span" sx={spanNoLineBreak}>
                    { userContext.user.email }
                  </Typography>
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
            <Button variant="contained" onClick={openChangePasswordDialog}>
              { t('UI.User.ChangePassword') }
            </Button>
            <Button variant="contained" color="error" onClick={openLogoutDialog}>
              { t('UI.User.Logout') }
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={openLogout} onClose={closeLogout}>
        <DialogTitle>{ t('UI.User.ConfirmLogout.Title') }</DialogTitle>
        <DialogActions>
          <Button onClick={closeLogout}>{ t('UI.Dialog.Cancel') }</Button>
          <Button onClick={confirmLogout}>{ t('UI.Dialog.Ok') }</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openChangePassword}>
        <DialogTitle>{ t('UI.User.ChangePassword') }</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="span">
            { t('UI.User.PasswordRequirement') }
          </Typography>
          <TextField inputRef={passwordEditRef}
                     inputProps={{ autoComplete: 'new-password' }}
                     type="password"
                     margin="dense"
                     variant="standard"
                     label={ t('UI.User.Password') }
                     sx={{ maxWidth: '320px' }}
          />
          <TextField inputRef={confirmPasswordEditRef}
                     inputProps={{ autoComplete: 'new-password' }}
                     type="password"
                     margin="dense"
                     variant="standard"
                     label={ t('UI.User.ConfirmPassword') }
                     sx={{ maxWidth: '320px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeChangePassword}>{ t('UI.Dialog.Cancel') }</Button>
          <Button onClick={confirmChangePassword}>{ t('UI.Dialog.Ok') }</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default User
