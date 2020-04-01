import { all, put, takeLatest, delay } from 'redux-saga/effects'
import { SET_TABLE_STATUS } from '../actions/types'
import { showNotification } from 'ra-core/lib/actions/notificationActions'

function * setTableStatus ({ payload }) {
  if (!payload) {
    delay(500)
    yield put(showNotification('Table disconnected', 'error'))
  }
}

export default function * tableSaga () {
  yield all([
    takeLatest(SET_TABLE_STATUS, setTableStatus)
  ])
}
