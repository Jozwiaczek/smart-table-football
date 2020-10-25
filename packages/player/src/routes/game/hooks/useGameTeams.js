import { useCallback, useEffect, useState } from 'react';
import { GET_LIST, GET_ONE, useDataProvider } from 'react-admin';
import { constants, models } from 'stf-core';

import useGoal from '../../../hooks/resources/useGoal';

const useGameTeams = (match) => {
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [teamAGoals, setTeamAGoals] = useState([]);
  const [teamBGoals, setTeamBGoals] = useState([]);
  const { removeGoal } = useGoal();
  const dataProvider = useDataProvider();

  const getTeam = useCallback(
    async (team) => {
      if (!match) return null;

      return (
        await dataProvider(GET_ONE, constants.resources.teams, {
          id: match[team],
        })
      ).data;
    },
    [match, dataProvider],
  );

  const getTeamGoals = useCallback(
    async (teamId) => {
      if (!match) return [];

      return (
        await dataProvider(GET_LIST, constants.resources.goals, {
          filter: {
            [models.goals.fields.team]: teamId,
            [models.goals.fields.match]: match._id,
          },
        })
      ).data;
    },
    [match, dataProvider],
  );

  useEffect(() => {
    const call = async () => {
      const teamAResponse = await getTeam(models.matches.fields.teamA);
      const teamBResponse = await getTeam(models.matches.fields.teamB);

      setTeamA(teamAResponse);
      setTeamB(teamBResponse);

      if (teamAResponse) {
        setTeamAGoals(await getTeamGoals(teamAResponse._id));
      }

      if (teamBResponse) {
        setTeamBGoals(await getTeamGoals(teamBResponse._id));
      }
    };
    call();
  }, [getTeam, getTeamGoals]);

  const getTeamName = useCallback(
    (teamId) => {
      if (!teamA || !teamB) return '';

      if (teamId === teamA._id) {
        return teamA[models.teams.fields.name];
      }
      return teamB[models.teams.fields.name];
    },
    [teamA, teamB],
  );

  const removeMatchGoal = useCallback(
    async (goal) => {
      try {
        await removeGoal(goal._id);
      } catch (error) {
        console.log('L:83 | error: ', error);
        return;
      }
      if (goal[models.goals.fields.team] === teamA._id) {
        setTeamAGoals((teamGoals) => teamGoals.filter((teamGoal) => teamGoal !== goal));
      } else {
        setTeamBGoals((teamGoals) => teamGoals.filter((teamGoal) => teamGoal !== goal));
      }
    },
    [removeGoal, setTeamAGoals, setTeamBGoals, teamA],
  );

  return {
    teamA,
    teamB,
    teamAGoals,
    teamBGoals,
    setTeamAGoals,
    setTeamBGoals,
    getTeamName,
    removeMatchGoal,
  };
};

export default useGameTeams;
