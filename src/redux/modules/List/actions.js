export const CHANGE_ITEM_FOCUS = 'CHANGE_ITEM_FOCUS'

export function changeItemFocus (id) {
  return {
    type: CHANGE_ITEM_FOCUS,
    id
  }
}
