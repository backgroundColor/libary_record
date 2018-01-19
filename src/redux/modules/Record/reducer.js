import update from 'react-addons-update'
import { CHANGE_FORM_STATE, GET_FORM_DATA } from './action'

export default function formReducer (state = {
  currentState: false,
  formdata: {}
}, action) {
  switch (action.type) {
    case CHANGE_FORM_STATE:
      return update(state, {
        currentState: { $set: action.state }
      })
    case GET_FORM_DATA:
      return update(state, {
        formdata: { $set: action.data }
      })
    default:
      return state
  }
}
