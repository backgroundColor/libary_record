// 通过豆瓣api获取图书信息
export const getBookInfo = (id) => {
  return fetch(`${__ISBN_URL__}${id}`)
  .then(res => res.json())
}
// 保存图书
export const saveBook = (data) => {
  const url = `${__HOST_URL__}books/savebook`
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    return res.json()
  })
}

// 删除图书

export const deleteBook = (id) => {
  const url = `${__HOST_URL__}books/deletebook`
  return fetch(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({id})
  })
  .then(res => res.json())
}
