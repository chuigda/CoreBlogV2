import React, { useRef, useState } from 'react'
import {
  Switch, Route, useHistory
} from 'react-router-dom'
import MainAppBar from './components/app-bar.jsx'
import Dial from './components/dial.jsx'
import UserContext from './components/user-context'
import ContainerContext from './components/container-context'
import Language from './views/language.jsx'
import Login from './views/login.jsx'
import Index from './views/index-page.jsx'
import BlogRead from './views/blog-read.jsx'
import About from './views/about.jsx'
import BlogEdit from './views/blog-edit.jsx'
import User from './views/user.jsx'
import { getLocalStorage } from './utils/localStorage'
import LoggedOut from './views/logged-out.jsx'

const initUserInfo = JSON.parse(getLocalStorage('User.Info'))

const App = () => {
  const history = useHistory()
  const [user, setUser] = useState(initUserInfo)
  const containerRef = useRef()
  const indexPageRef = useRef()

  const [scroll, setScroll] = useState(0)
  const [initialized, setInitialized] = useState(false)
  const [blogList, setBlogList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMoreContent, setHasMoreContent] = useState(false)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ContainerContext.Provider value={containerRef}>
        <div className="App" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <MainAppBar refreshIndex={() => {
            setScroll(0)
            containerRef.current.scrollTo(0, 0)
            indexPageRef.current.loadInitBlogList()
          }} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            overflowY: 'auto',
            overflowX: 'hidden'
          }} ref={containerRef}>
            <div style={{
              paddingTop: 14,
              paddingBottom: 20,
              maxWidth: 1000,
              width: 'calc(100% - 20px)'
            }}>
              <Switch>
                <Route exact path="/">
                  <Index ref={indexPageRef}
                         bundle={{
                           scroll,
                           setScroll,
                           initialized,
                           setInitialized,
                           blogList,
                           setBlogList,
                           currentPage,
                           setCurrentPage,
                           hasMoreContent,
                           setHasMoreContent
                         }}
                  />
                </Route>
                <Route exact path="/user">
                  <User />
                </Route>
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
                  <LoggedOut />
                </Route>
                <Route exact path="/about">
                  <About />
                </Route>
              </Switch>
            </div>
          </div>
          <Dial />
        </div>
      </ContainerContext.Provider>
    </UserContext.Provider>
  )
}

export default App
