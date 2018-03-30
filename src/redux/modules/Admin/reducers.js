import update from 'react-addons-update'
import { STORE_USER_MESS, CLEAR_USER_MESS } from './actions'

export default function adminReducers (state = {
  userInfo: {}
}, actions) {
  switch (actions.type) {
    case STORE_USER_MESS:
      return update(state, {
        userInfo: {$set: actions.data}
      })
    case CLEAR_USER_MESS:
      return update(state, {
        userInfo: {$set: {}}
      })
    default:
      return state
  }
}
