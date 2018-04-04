import axios from 'axios'
axios.defaults.withCredentials = true
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
  return axios(url)
  .then(res => res.data)
}
// 保存图书
export const saveBook = (data) => {
  const url = `${__HOST_URL__}books/savebook`
  return axios(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data
  })
  .then(res => res.data)
}

// 删除图书

export const deleteBook = (id) => {
  const url = `${__HOST_URL__}books/deletebook`
  return axios(url, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
    data: {id}
  })
  .then(res => res.data)
}

// 修改图书

export const updateBook = (val) => {
  const url = `${__HOST_URL__}books/updatebook`
  return axios(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data: val
  })
  .then(res => res.data)
}

// 登陆
export const login = (val) => {
  const url = `${__HOST_URL__}admin/login`
  return axios(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    data: val
  })
  .then(res => res.data)
}
