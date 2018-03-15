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
export default (store) => (
  <Router>
    <Route path='/' component={CoreLayout}>
      <IndexRoute component={Home} />
      <Route path='record' component={RecordPage} />
      <Route path='list' component={ListPage} />
      <Route path='login' component={LoginPage} />
    </Route>
  </Router>
)
