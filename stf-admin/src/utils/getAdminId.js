/* global localStorage */
import decodeJwt from 'jwt-decode'
import { constants } from 'stf-core'

export const getAdminId = () => {
  const token = localStorage.getItem(constants.storageKey)
  if (!token) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ redirectTo: '/login' })
  }
  const decoded = decodeJwt(token)
  return decoded.adminId
}
