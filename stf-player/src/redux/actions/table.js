import { SET_TABLE_STATUS } from './types'

export const setTableStatus = (isActive) => ({
  type: SET_TABLE_STATUS,
  payload: isActive
})
