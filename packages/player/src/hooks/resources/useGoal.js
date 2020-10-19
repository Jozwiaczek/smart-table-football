import { DELETE, useDataProvider } from 'react-admin';
import { constants } from 'stf-core';
import { useCallback } from 'react';

const useGoal = () => {
  const dataProvider = useDataProvider();

  const removeGoal = useCallback(
    async (id) => {
      await dataProvider(DELETE, constants.resources.goals, { id });
    },
    [dataProvider],
  );

  return { removeGoal };
};

export default useGoal;
