import React, { useContext, useRef } from 'react'
import {
  TextField, Button, Card, CardContent, Typography, Divider
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { mobius } from '../utils/mobius'
import { saveCreds } from '../utils/credUtil'
import UserContext from '../components/user-context'
import { setLocalStorage } from '../utils/localStorage'
import XDivider from '../components/divider'

const Login = () => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const history = useHistory()
  const { setUser } = useContext(UserContext)

  const userNameRef = useRef()
  const passwordRef = useRef()

  const login = () => {
    const userName = userNameRef.current.value
    const password = passwordRef.current.value

    if (userName.length === 0 || password.length === 0) {
      enqueueSnackbar(t('UI.Login.Unfilled'), { variant: 'error' })
      return
    }

    mobius.post('/api/user/login')
      .data({ userName, password })
      .do()
      .then(res => {
        if (!res.success) {
          enqueueSnackbar(t(res.messageId), { variant: 'error' })
          return
        }

        saveCreds({ accessToken: res.data.accessToken, userId: res.data.user.userId })
        setLocalStorage('User.Info', JSON.stringify(res.data.user))
        setUser(res.data.user)
        enqueueSnackbar(t(res.messageId), { variant: 'success' })
        history.replace('/')
      })
      .catch(() => enqueueSnackbar(t('Server.InternalError'), { variant: 'error' }))
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ flex: '0 1 400px' }}>
        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant="h6">
            { t('UI.Login.Title') }
          </Typography>
          <XDivider style={{ marginBottom: 12 }} />
          <TextField
            label={ t('UI.Login.Username') }
            variant="standard"
            inputRef={ userNameRef }
            fullWidth
            sx={{ marginBottom: '12px' }}
            size="small"
            required
          />
          <TextField
            label={ t('UI.Login.Password') }
            variant="standard"
            inputRef={ passwordRef }
            fullWidth
            type="password"
            sx={{ marginBottom: '12px' }}
            size="small"
            required
          />
          <Button variant="contained" onClick={login}>
            { t('UI.Login.Submit') }
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
