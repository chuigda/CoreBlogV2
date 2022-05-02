import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import App from './app.jsx'
import translation from './translation'
import './index.css'
import theme from './theme'
import { getLocalStorage } from './utils/localStorage'

i18n.use(initReactI18next)
  .init(translation)
  .then(() => {
    ReactDOM.render(
      <SnackbarProvider maxSnack={5}>
        <ThemeProvider theme={theme}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ThemeProvider>
      </SnackbarProvider>,
      document.getElementById('root')
    )
  })
