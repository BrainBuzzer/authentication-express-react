export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

/**
 * 
 * @param { token, username } payload
 */
export function handleUserLogin (payload) {
  return {
    type: USER_LOGIN,
    payload
  }
}

export function handleUserLogout () {
  return {
    type: USER_LOGOUT
  }
}