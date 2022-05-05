import React, { useRef, useState } from 'react'
import {
  Switch, Route, Link, useHistory, useRouteMatch
} from 'react-router-dom'
import { Button } from '@mui/material'
import MainAppBar from './components/app-bar.jsx'
import Dial from './components/dial.jsx'
import Language from './views/language.jsx'
import Login from './views/login.jsx'
import Index from './views/index-page.jsx'
import BlogRead from './views/blog-read.jsx'
import About from './views/about.jsx'
import BlogEdit from './views/blog-edit.jsx'
import UserContext from './components/user-context'
import { getLocalStorage } from './utils/localStorage'

const initUserInfo = JSON.parse(getLocalStorage('User.Info'))

const App = () => {
  const history = useHistory()
  const [user, setUser] = useState(initUserInfo)
  const matchIndex = useRouteMatch({
    path: '/',
    strict: true,
    exact: true
  })
  const indexPageRef = useRef()

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <MainAppBar refreshIndex={() => indexPageRef.current.loadBlogList(1)} />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}>
          <div style={{
            paddingTop: 14,
            paddingBottom: 20,
            maxWidth: 1000,
            width: 'calc(100% - 20px)'
          }}>
            { <Index ref={indexPageRef} display={matchIndex} /> }
            <Switch>
              <Route exact path="/blog/:blogId">
                <BlogRead />
              </Route>
              <Route exact path="/edit">
                <BlogEdit />
              </Route>
              <Route exact path="/login">
                <Login history={history} />
              </Route>
              <Route exact path="/language">
                <Language />
              </Route>
              <Route exact path="/logged-out">
                <div>You were logged out, damn it</div>
                <Link to="/login">
                  <Button variant="contained">Goto log-in</Button>
                </Link>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </div>
        <Dial />
      </div>
    </UserContext.Provider>
  )
}

export default App
