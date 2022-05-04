import React, { useContext, useRef, useState } from 'react'
import { Button, Popover } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import TranslateIcon from '@mui/icons-material/Translate'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import InfoIcon from '@mui/icons-material/Info'
import SyncIcon from '@mui/icons-material/Sync'
import { styled, alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useSnackbar } from 'notistack'
import { Link, useLocation, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import UserContext from './user-context'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: 'auto'
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    maxWidth: '360px'
  },
}))

const MainAppBar = ({ refreshIndex }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const userContext = useContext(UserContext)
  const searchBoxRef = useRef()

  const [anchor, setAnchor] = useState(null)
  const open = Boolean(anchor)

  const [searchMenuAnchor, setSearchMenuAnchor] = useState(null)
  const searchMenuOpen = Boolean(searchMenuAnchor)
  const [searchText, setSearchText] = useState('')

  const handleClick = event => setAnchor(event.currentTarget)
  const handleClose = () => setAnchor(null)

  const handleSearchFocus = e => {
    const { value } = e.target
    if (value.length > 0) {
      setSearchMenuAnchor(searchBoxRef.current)
      setSearchText(value)
    } else {
      setSearchMenuAnchor(null)
    }
  }
  const handleSearchMenuClose = () => setSearchMenuAnchor(null)
  const handleSearchAction = () => enqueueSnackbar(t('UI.Search.Unimplemented'), { variant: 'info' })

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={handleClick}>
          <MenuIcon />
        </IconButton>
        <IconButton size="large"
                    edge="start"
                    color="inherit"
                    sx={{ mr: 2 }}
                    onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </IconButton>
        {
          (location.pathname !== '/') && (
            <IconButton size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        component={Link}
                        to="/">
              <HomeIcon />
            </IconButton>
          )
        }
        {
          (location.pathname === '/') && (
            <IconButton size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={ refreshIndex }>
              <SyncIcon />
            </IconButton>
          )
        }
        <Menu anchorEl={anchor} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}
                    component={Link}
                    to={'/language'}>
            <ListItemIcon>
              <TranslateIcon />
            </ListItemIcon>
            { t('UI.MainMenu.SetLanguage') }
          </MenuItem>
          {
            userContext.user ? (
              <MenuItem onClick={handleClose}
                        component={Link}
                        to={'/user'}>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                { t('UI.MainMenu.CurrentUser') }
                { ': ' }
                { userContext.user.userName }
              </MenuItem>
            ) : (
              <MenuItem onClick={handleClose}
                        component={Link}
                        to={'/login'}>
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                { t('UI.MainMenu.Login') }
              </MenuItem>
            )
          }
          <MenuItem onClick={handleClose}
                    component={Link}
                    to={'/about'}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            { t('UI.MainMenu.About') }
          </MenuItem>
        </Menu>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: {
              xs: 'none',
              sm: 'unset',
              md: 'unset',
              lg: 'unset',
              xl: 'unset',
            }
          }}
        >
          CoreBlog V2
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Search ref={searchBoxRef}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={ t('UI.AppBar.Search') }
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleSearchFocus}
            onFocus={handleSearchFocus}
          />
        </Search>
        <Popover anchorEl={searchMenuAnchor}
                 disableAutoFocus={true}
                 disableEnforceFocus={true}
                 open={searchMenuOpen}
                 onClose={handleSearchMenuClose}
                 anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button onClick={handleSearchAction}>
              { t('UI.Search.Title') }
              { ': ' }
              { searchText }
            </Button>
            <Button onClick={handleSearchAction}>
              { t('UI.Search.FullText') }
              { ': ' }
              { searchText }
            </Button>
            <Button onClick={handleSearchAction}>
              { t('UI.Search.User') }
              { ': ' }
              { searchText }
            </Button>
          </div>
        </Popover>
      </Toolbar>
    </AppBar>
  )
}

MainAppBar.propTypes = {
  refreshIndex: PropTypes.func.isRequired
}

export default MainAppBar
