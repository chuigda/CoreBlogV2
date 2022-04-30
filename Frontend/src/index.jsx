import React from 'react'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import App from './app.jsx'
import translation from './translation'

console.log(translation)

i18n.use(initReactI18next)
  .init(translation)
  .then(() => {
    ReactDOM.render(
      <SnackbarProvider maxSnack={5}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SnackbarProvider>,
      document.getElementById('root')
    )
  })
