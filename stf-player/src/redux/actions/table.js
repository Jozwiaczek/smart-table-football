import { SET_TABLE_AVAILABILITY, SET_TABLE_STATUS } from './types'

export const setTableStatus = (isActive) => ({
  type: SET_TABLE_STATUS,
  payload: isActive
})

export const setTableAvailability = (isInGame) => ({
  type: SET_TABLE_AVAILABILITY,
  payload: isInGame
})
