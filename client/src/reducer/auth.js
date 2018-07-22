import {
  USER_LOGIN,
  USER_LOGOUT
} from '../actions/auth'

export function auth (state = { token: null }, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...action.payload
      }
    case USER_LOGOUT:
      return {
        token: null
      }
    default:
      return state
  }
}