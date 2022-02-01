import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/'

const config = {
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}

export const getAPI = (url, cancel = {}) => {
  const getConfig = { ...config, ...cancel }
  return axios.get(url, getConfig).then(res => res.data)
}

export const postAPI = (url, payload, headers = false) => {
  const headerConfig = { ...config }
  if (headers) {
    headerConfig.headers['Content-Type'] = 'application/json'
  }
  return axios.post(url, payload, headerConfig).then(res => res.data)
}

const listMenuItems = () => getAPI('/menu/items/')

const listOrders = () => getAPI('/menu/orders/')

const createOrder = data => postAPI('/menu/orders/', data)

export {
  listMenuItems,
  listOrders,
  createOrder
}
