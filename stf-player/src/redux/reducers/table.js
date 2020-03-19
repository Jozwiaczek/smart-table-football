import { SET_TABLE_STATUS } from '../actions/types'

const INITIAL_STATE = {
  isActive: true
}

export const TableReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TABLE_STATUS :
      return {
        ...state,
        isActive: action.payload
      }
    default:
      return state
  }
}
