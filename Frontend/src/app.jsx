import React from 'react'
import {
  BrowserRouter, Switch, Route, Link, useHistory
} from 'react-router-dom'
import { Button } from '@mui/material'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Login from './views/LoginPage.jsx'
import Index from './views/IndexPage.jsx'
import translation from './translation'

i18n.use(initReactI18next)
  .init(translation)
  .then(() => {})

const App = () => {
  const history = useHistory()
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <Login history={history}/>
          </Route>
          <Route exact path="/index">
            <Index history={history}/>
          </Route>
          <Route exact path="/logged-out">
            <div>You were logged out, damn it</div>
            <Link to="/login">
              <Button variant="contained">Goto log-in</Button>
            </Link>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
