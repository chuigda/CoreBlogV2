import React, { useContext, useState } from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SpeedDial,
  SpeedDialAction, SpeedDialIcon
} from '@mui/material'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import ShareIcon from '@mui/icons-material/Share'
import { Link, useLocation } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import UserContext from './user-context'

const Dial = () => {
  const location = useLocation()
  const { user } = useContext(UserContext)
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleOpen = () => setOpen(!open)
  const handleDialogClose = () => setDialogOpen(false)
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      enqueueSnackbar(t('UI.Dialog.Copied'), { variant: 'success' })
    })
  }

  return (
    <>
      <SpeedDial sx={{ position: 'fixed', bottom: 16, right: 16 }}
                 icon={<SpeedDialIcon />}
                 onClick={handleOpen}
                 open={open}
                 onOpen={() => {}}
                 onClose={() => {}}
                 ariaLabel="speed dail">
        {
          (user && location.pathname === '/') && <SpeedDialAction
            icon={<SaveAsIcon />}
            label="Home"
            title={t('UI.Dial.WriteBlog')}
            component={Link}
            to="/edit"
          />
        }
        <SpeedDialAction
          icon={<ShareIcon />}
          label="Share"
          title={t('UI.Dial.Share')}
          onClick={() => setDialogOpen(true)}
        />
      </SpeedDial>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{ t('UI.Dialog.Share') }</DialogTitle>
        <DialogContent>
          <DialogContentText>
            { window.location.href }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopyLink}>{ t('UI.Dialog.CopyLink') }</Button>
          <Button onClick={handleDialogClose}>{ t('UI.Dialog.Close') }</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Dial
