import { SET_TABLE_AVAILABILITY, SET_TABLE_STATUS } from '../actions/types'

const INITIAL_STATE = {
  isActive: true,
  isInGame: null
}

export const TableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TABLE_STATUS :
      return {
        ...state,
        isActive: action.payload
      }
    case SET_TABLE_AVAILABILITY :
      return {
        ...state,
        isInGame: action.payload
      }
    default:
      return state
  }
}
