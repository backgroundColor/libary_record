// 通过豆瓣api获取图书信息
export const getBookInfo = (id) => {
  return fetch(`${__ISBN_URL__}${id}`, {
    credentials: 'include'
  })
  .then(res => res.json())
}

// 获取图书
export const getBookList = (params) => {
  const query = params ? Object.keys(params).map(key => `${key}=${params[key]}`).join('&') : ''
  const url = `${__HOST_URL__}books/bookslist?${query}`
  return fetch(url, {
    // credentials: 'include',
    withCredentials: true
  })
  .then(res => res.json())
}
// 保存图书
export const saveBook = (data) => {
  const url = `${__HOST_URL__}books/savebook`
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
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
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({id})
  })
  .then(res => res.json())
}

// 修改图书

export const updateBook = (val) => {
  const url = `${__HOST_URL__}books/updatebook`
  return fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(val)
  })
  .then(res => res.json())
}

// 登陆
export const login = (val) => {
  const url = `${__HOST_URL__}admin/login`
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(val)
  })
  .then(res => res.json())
}
