export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

/**
 * 
 * @param { String } token
 */
export function handleUserLogin (token) {
  return {
    type: USER_LOGIN,
    token
  }
}

export function handleUserLogout () {
  return {
    type: USER_LOGOUT
  }
}