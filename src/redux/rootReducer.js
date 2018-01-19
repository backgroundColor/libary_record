import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import recordReducer from './modules/Record/reducer'
export default combineReducers({
  counter,
  router,
  recordReducer
})
