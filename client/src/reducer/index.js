import { combineReducers } from 'redux'
import { auth } from './auth'

/**
 * @description This file is here just in case
 * multiple reducers are added to the store.
 */
export default combineReducers({ auth })