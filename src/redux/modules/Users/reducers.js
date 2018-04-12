import update from 'react-addons-update'
import { DELETE_USER } from './actions'

export default function usersReducers (state = {
  deleteSta: false,
  deleteName: ''
}, action) {
  switch (action.type) {
    case DELETE_USER:
      return update(state, {
        deleteSta: { $set: action.value },
        deleteName: { $set: action.name }
      })
    default:
      return state
  }
}
