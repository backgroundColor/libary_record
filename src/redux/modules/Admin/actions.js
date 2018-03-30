export const STORE_USER_MESS = 'STORE_USER_MESS'
export const CLEAR_USER_MESS = 'CLEAR_USER_MESS'

export function storeUserMess (data) {
  return {
    type: STORE_USER_MESS,
    data
  }
}

export function clearUserMess () {
  return {
    type: CLEAR_USER_MESS
  }
}
