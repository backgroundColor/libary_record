export const DELETE_USER = 'DELETE_USER'

export function deleteControl (bool, name) {
  return {
    type: DELETE_USER,
    value: bool,
    name
  }
}
