import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import recordReducer from './modules/Record/reducer'
import listReducer from './modules/List/reducer'
import adminReducers from './modules/Admin/reducers'
import usersReducers from './modules/Users/reducers'
export default combineReducers({
  counter,
  router,
  recordReducer,
  listReducer,
  adminReducers,
  usersReducers
})
