import { CREATE } from 'react-admin'
import {
  constants
} from '@stf/stf-core'

function _getPayload () {
  return {}
}

const clientAuthManagementActionFactory = (action = 'clientAuthManagement', getPayload = _getPayload) => {
  return (id, data) => ({
    type: action.toUpperCase(),
    payload: {
      data: {
        action,
        ...getPayload(id, data)
      }
    },
    meta: {
      resource: constants.resources.clientAuthManagement,
      fetch: CREATE,
      onSuccess: {
        notification: {
          body: `resources.users.notification.clientAuthManagement.success.${action}`,
          level: 'info',
          messageArgs: {
            ...data
          }
        }
      },
      onFailure: {
        notification: {
          body: `resources.users.notification.clientAuthManagement.failure.${action}`,
          level: 'warning',
          messageArgs: {
            ...data
          }
        }
      }
    }
  })
}

export default clientAuthManagementActionFactory
