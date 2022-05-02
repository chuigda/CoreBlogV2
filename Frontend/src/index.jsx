import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import App from './app.jsx'
import UserContext from './components/user-context'
import translation from './translation'
import './index.css'
import theme from './theme'
import { getLocalStorage } from './utils/localStorage'

const user = getLocalStorage('User.Info')

i18n.use(initReactI18next)
  .init(translation)
  .then(() => {
    ReactDOM.render(
      <SnackbarProvider maxSnack={5}>
        <UserContext.Provider value={user}>
          <ThemeProvider theme={theme}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ThemeProvider>
        </UserContext.Provider>
      </SnackbarProvider>,
      document.getElementById('root')
    )
  })
