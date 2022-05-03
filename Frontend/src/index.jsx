import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import App from './app.jsx'
import translation from './translation'
import './index.css'
import theme from './theme'

i18n.use(initReactI18next)
  .init(translation)
  .then(() => {
    ReactDOM.render(
      <React.StrictMode>
        <SnackbarProvider maxSnack={5}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </SnackbarProvider>
      </React.StrictMode>,
      document.getElementById('root')
    )
  })
