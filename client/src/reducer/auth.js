import {
  USER_LOGIN,
  USER_LOGOUT
} from '../actions/auth'

/**
 * @description This is auth reducer which stores the token
 * generated on server on localStorage.
 * 
 * @param {Object} state Stores the state in store
 * @param {*} action Payload
 */
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