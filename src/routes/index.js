import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
// import HomeView from 'views/HomeView/HomeView'
import Home from 'views/Home'
import RecordPage from 'views/RecordPage'
import ListPage from 'views/ListPage'
import LoginPage from 'views/LoginPage'
import requireAuth from '../components/AuthCheck'
import Register from '../views/Register'
import UsersPage from '../views/UsersPage'
export default (store) => (
  <Router>
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={requireAuth(Home)} />
      <Route path='record' component={requireAuth(RecordPage)} />
      <Route path='list' component={requireAuth(ListPage)} />
      <Route path='users' component={requireAuth(UsersPage)} />
      <Route path='login' component={LoginPage} />
      <Route path='register' component={Register} />
    </Route>
  </Router>
)
