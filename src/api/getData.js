export const getBookInfo = (id) => {
  return fetch(`${__ISBN_URL__}${id}`)
  .then(res => res.json())
}
