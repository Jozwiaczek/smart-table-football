import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { constants, models } from 'stf-core';

import { socket } from '../client/feathersSocketClient';
import useMatch from './resources/useMatch';
import useOnBeforeUnload from './useOnBeforeUnload';

const useGameMatch = () => {
  const [matchId, setMatchId] = useState(null);
  const [elapsedTimer, setElapsedTimer] = useState(0);
  const [status, setStatus] = useState(null);
  const [isTimerRun, setIsTimerRun] = useState(false);
  const { match, getMatch, updateMatch } = useMatch();

  const history = useHistory();
  const searchParams = history.location.search;

  useOnBeforeUnload(
    useCallback(async () => {
      if (status === constants.statusMatch.active) {
        await changeMatchStatus();
      }
    }, [status]),
  );

  useEffect(() => {
    const call = async () => {
      const urlParams = new URLSearchParams(searchParams);
      setMatchId(urlParams.get('match'));

      if (!matchId) return;

      const resultMatch = await getMatch(matchId);

      setElapsedTimer(resultMatch[models.matches.fields.elapsedTime]);
      setStatus(resultMatch[models.matches.fields.status]);
    };
    call();
  }, [matchId, searchParams, getMatch]);

  useEffect(() => {
    let interval = null;
    if (isTimerRun) {
      const start = Date.now() - elapsedTimer;

      interval = setInterval(() => {
        const currentStepTime = Date.now() - start;
        socket.emit('currentStepTime', currentStepTime);
      }, 100);
    } else if (!isTimerRun && elapsedTimer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRun, elapsedTimer]);

  const startMatchTimer = useCallback(() => {
    setIsTimerRun(true);
  }, []);

  const stopMatchTimer = useCallback(() => {
    setIsTimerRun(false);
    return elapsedTimer;
  }, [elapsedTimer]);

  const changeMatchStatus = useCallback(async () => {
    if (status !== constants.statusMatch.active) {
      startMatchTimer();

      await updateMatch(matchId, {
        [models.matches.fields.status]: constants.statusMatch.active,
      });

      setStatus(constants.statusMatch.active);
    } else {
      const elapsedTime = stopMatchTimer();

      await updateMatch(matchId, {
        [models.matches.fields.status]: constants.statusMatch.paused,
        [models.matches.fields.elapsedTime]: elapsedTime,
      });

      setStatus(constants.statusMatch.paused);
    }

    socket.emit(constants.socketEvents.isTableInGame);
  }, [status, startMatchTimer, stopMatchTimer, setStatus, updateMatch, matchId]);

  const updateMatchGame = useCallback(
    async (data) => {
      if (!matchId) return null;

      return updateMatch(matchId, data);
    },
    [matchId, updateMatch],
  );

  const finishMatch = useCallback(async () => {
    const elapsedTime = stopMatchTimer();
    await updateMatch(matchId, {
      [models.matches.fields.status]: constants.statusMatch.paused,
      [models.matches.fields.elapsedTime]: elapsedTime,
    });
    socket.emit(constants.socketEvents.isTableInGame);
    history.push(`/${constants.resources.matches}`);
  }, [history, stopMatchTimer, updateMatch, matchId]);

  return {
    match,
    matchId,
    elapsedTimer,
    setElapsedTimer,
    status,
    changeMatchStatus,
    updateMatchGame,
    stopMatchTimer,
    finishMatch,
  };
};

export default useGameMatch;
