import { CREATE } from 'react-admin';
import { constants } from 'stf-core';

function _getPayload() {
  return {};
}

const playerAuthManagementActionFactory = (
  action = 'playerAuthManagement',
  getPayload = _getPayload,
) => {
  return (id, data) => ({
    type: action.toUpperCase(),
    payload: {
      data: {
        action,
        ...getPayload(id, data),
      },
    },
    meta: {
      resource: constants.resources.playerAuthManagement,
      fetch: CREATE,
      onSuccess: {
        notification: {
          body: `resources.users.notification.playerAuthManagement.success.${action}`,
          level: 'info',
          messageArgs: {
            ...data,
          },
        },
      },
      onFailure: {
        notification: {
          body: `resources.users.notification.playerAuthManagement.failure.${action}`,
          level: 'warning',
          messageArgs: {
            ...data,
          },
        },
      },
    },
  });
};

export default playerAuthManagementActionFactory;
