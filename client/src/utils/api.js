import axios from 'axios'

export function userRegistration(username, password) {
  return axios.post('/register', {
    username,
    password
  })
}

export function userLogin(username, password) {
  return axios.post('/login', {
    username,
    password
  })
}
