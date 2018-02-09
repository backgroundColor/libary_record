import update from 'react-addons-update'
import { CHANGE_ITEM_FOCUS } from './actions'

export default function listReducer (state = {
  currentItem: ''
}, action) {
  switch (action.type) {
    case CHANGE_ITEM_FOCUS:
      return update(state, {
        currentItem: { $set: action.id }
      })
    default:
      return state
  }
}
