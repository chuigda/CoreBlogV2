import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LoggedOut = () => {
  const history = useHistory()
  const { t } = useTranslation()

  const back = () => history.goBack()
  const toLogin = () => history.replace('/login')

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

export default LoggedOut
