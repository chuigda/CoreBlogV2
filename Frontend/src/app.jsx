import React from 'react'
import {
  BrowserRouter, Switch, Route, Link, useHistory
} from 'react-router-dom'
import { Button } from '@mui/material'

import MainAppBar from './components/app-bar.jsx'
import Language from './views/language.jsx'
import Login from './views/LoginPage.jsx'
import Index from './views/IndexPage.jsx'

const App = () => {
  const history = useHistory()

  return (
    <BrowserRouter>
      <div className="App">
        <MainAppBar />
        <div style={{ marginTop: 8 }}>
        <Switch>
          <Route exact path="/login">
            <Login history={history} />
          </Route>
          <Route exact path="/language">
            <Language />
          </Route>
          <Route exact path="/index">
            <Index history={history} />
          </Route>
          <Route exact path="/logged-out">
            <div>You were logged out, damn it</div>
            <Link to="/login">
              <Button variant="contained">Goto log-in</Button>
            </Link>
          </Route>
        </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
