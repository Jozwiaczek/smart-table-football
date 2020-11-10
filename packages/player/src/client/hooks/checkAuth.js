import { constants } from 'stf-core';

export default function checkAuth() {
  return (context) => {
    const tmp = context.error.message;
    if (tmp === "Authentication strategy 'jwt' is not registered.") {
      localStorage.removeItem(constants.storageKey);
    }
    return context;
  };
}
