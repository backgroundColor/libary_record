export const CHANGE_FORM_STATE = 'CHANGE_FORM_STATE'
export const GET_FORM_DATA = 'GET_FORM_DATA'
export function changeFormState (state) {
  return {
    type: CHANGE_FORM_STATE,
    state
  }
}

export function getFormData (data) {
  return {
    type: GET_FORM_DATA,
    data
  }
}
