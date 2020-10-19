import { UPDATE, GET_ONE, useDataProvider } from 'react-admin';
import { constants } from 'stf-core';
import { useCallback, useState } from 'react';

const useMatch = (init = null) => {
  const [match, setMatch] = useState(init);
  const dataProvider = useDataProvider();

  const getMatch = useCallback(
    async (id) => {
      const getResult = (await dataProvider(GET_ONE, constants.resources.matches, { id })).data;
      setMatch(getResult);
      return getResult;
    },
    [dataProvider],
  );

  const updateMatch = useCallback(
    async (id, data) => {
      const updateResult = (await dataProvider(UPDATE, constants.resources.matches, { id, data }))
        .data;
      setMatch(updateResult);
      return updateResult;
    },
    [dataProvider],
  );

  return { match, setMatch, updateMatch, getMatch };
};

export default useMatch;
