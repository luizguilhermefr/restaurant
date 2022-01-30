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

const listMenuItems = () => getAPI('/menu/items/')

export {
  listMenuItems
}
