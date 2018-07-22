import {
  USER_LOGIN,
  USER_LOGOUT
} from '../actions/auth'

export function auth (state = { token: null }, action) {
  switch (action.type) {
    case USER_LOGIN:
      localStorage.setItem('API_TOKEN', action.token)
      return {
        token: action.token
      }
    case USER_LOGOUT:
      localStorage.removeItem('API_TOKEN')
      return {
        token: null
      }
    default:
      return state
  }
}