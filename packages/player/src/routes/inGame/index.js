import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { DELETE, GET_LIST, GET_ONE, UPDATE, useDataProvider } from 'react-admin';
import { makeStyles, Typography } from '@material-ui/core';
import { constants, models } from 'stf-core';

import { useDispatch, useSelector } from 'react-redux';

import TeamCard from './TeamCard';
import NewGoalModal from './modals/GoalDetailsModal';
import { socket } from '../../client/feathersSocketClient';
import WarningModal from './modals/WarningModal';
import GoalsHistory from './GoalsHistory';
import GameControls from './GameControls';
import LayoutWrapper from './LayoutWrapper';

const useStyles = makeStyles(() => ({
  main: {
    minHeight: '100vh',
    overflow: 'auto',
  },
  button: {
    margin: '2rem 0 0.5rem 0',
    width: '100%',
  },
  title: {
    marginTop: '5vh',
  },
  game: {
    marginTop: '10em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}));

export default ({ history }) => {
  const [match, setMatch] = useState(null);
  const [status, setStatus] = useState(null);
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [teamAGoals, setTeamAGoals] = useState([]);
  const [teamBGoals, setTeamBGoals] = useState([]);
  const [newGoal, setNewGoal] = useState(null);
  const [elapsedTimer, setElapsedTimer] = useState(0);
  const [isTimerRun, setIsTimerRun] = useState(false);
  const [isGoalModalOpen, setGoalModalOpen] = useState(false);
  const [completedCountdown, setCompletedCountdown] = useState(0);
  const [isTableDisconnectedModal, setTableDisconnectedModal] = useState(false);
  const [isOtherMatchStartedModalVisible, setOtherMatchStartedModalVisible] = useState(false);

  const classes = useStyles();
  const dataProvider = useDataProvider();

  const isTableActive = useSelector((state) => state.table.isActive);
  const isTableInGame = useSelector((state) => state.table.isInGame);

  const dispatch = useDispatch();
  const historyHook = useHistory();

  const countDownInterval = useRef();

  const startTimer = () => {
    setIsTimerRun(true);
  };

  const stopTimer = useCallback(() => {
    setIsTimerRun(false);
    return elapsedTimer;
  }, [elapsedTimer]);

  const changeStatus = useCallback(async () => {
    if (status !== constants.statusMatch.active) {
      startTimer();
      await dataProvider(UPDATE, constants.resources.matches, {
        id: match.id,
        data: {
          [models.matches.fields.status]: constants.statusMatch.active,
        },
      });
      setStatus(constants.statusMatch.active);
    } else {
      const elapsedTime = stopTimer();
      await dataProvider(UPDATE, constants.resources.matches, {
        id: match.id,
        data: {
          [models.matches.fields.status]: constants.statusMatch.paused,
          [models.matches.fields.elapsedTime]: elapsedTime,
        },
      });
      setStatus(constants.statusMatch.paused);
    }
    socket.emit(constants.socketEvents.isTableInGame);
  }, [dataProvider, match, status, stopTimer]);

  const finishMatch = async () => {
    const elapsedTime = stopTimer();
    await dataProvider(UPDATE, constants.resources.matches, {
      id: match.id,
      data: {
        [models.matches.fields.status]: constants.statusMatch.paused,
        [models.matches.fields.elapsedTime]: elapsedTime,
      },
    });
    socket.emit(constants.socketEvents.isTableInGame);
    history.push(`/${constants.resources.matches}`);
  };

  const openModalNewGoal = (instant) => {
    setGoalModalOpen(true);
    if (!instant) {
      countDownInterval.current = setInterval(() => {
        setCompletedCountdown((oldCompleted) => {
          return oldCompleted + 1;
        });
      }, 55);
    }
  };

  const closeModalNewGoal = () => {
    setGoalModalOpen(false);
    clearInterval(countDownInterval.current);
    setCompletedCountdown(0);
  };

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

  const onCloseOtherMatchStartedModal = () => {
    setOtherMatchStartedModalVisible(false);
    historyHook.push('/');
  };

  const onCloseTableDisconnectedModal = async () => {
    setTableDisconnectedModal(false);
    if (status === constants.statusMatch.active) {
      const elapsedTime = stopTimer();
      await dataProvider(UPDATE, constants.resources.matches, {
        id: match.id,
        data: {
          [models.matches.fields.status]: constants.statusMatch.paused,
          [models.matches.fields.elapsedTime]: elapsedTime,
        },
      });
    }
    historyHook.push('/');
  };

  let matchId;
  if (!isTableDisconnectedModal) {
    const urlParams = new URLSearchParams(history.location.search);
    matchId = urlParams.get('match');
  }

  useEffect(() => {
    const call = async () => {
      try {
        if (!isTableActive) {
          setTableDisconnectedModal(true);
        }
        if (isTableInGame && isTableInGame !== matchId) {
          setOtherMatchStartedModalVisible(true);
        }
        if (!isTableDisconnectedModal && matchId) {
          socket.emit(constants.socketEvents.isTableInGame);
          socket.on('currentStepTime', (currentStepTime) => {
            setElapsedTimer(currentStepTime);
          });

          const resMatch = await dataProvider(GET_ONE, constants.resources.matches, {
            id: matchId,
          }).then((res) => res.data);
          setMatch(resMatch);
          setElapsedTimer(resMatch[models.matches.fields.elapsedTime]);
          setStatus(resMatch[models.matches.fields.status]);
          const resTeamA = await dataProvider(GET_ONE, constants.resources.teams, {
            id: resMatch[models.matches.fields.teamA],
          }).then((res) => res.data);
          setTeamA(resTeamA);
          const resTeamAGoals = await dataProvider(GET_LIST, constants.resources.goals, {
            filter: {
              [models.goals.fields.team]: resTeamA._id,
              [models.goals.fields.match]: resMatch._id,
            },
          }).then((res) => res.data);
          setTeamAGoals(resTeamAGoals);

          setTeamB(
            await dataProvider(GET_ONE, constants.resources.teams, {
              id: resMatch[models.matches.fields.teamB],
            }).then((res) => res.data),
          );
          socket.on(constants.socketEvents.createdGoal, (goal) => {
            setNewGoal(goal);
            setTeamAGoals((teamAGoals) => {
              teamAGoals[teamAGoals.length] = goal;
              return teamAGoals;
            });
            openModalNewGoal();
            setTimeout(() => {
              closeModalNewGoal();
            }, 6000);
          });
        }
      } catch (e) {
        throw new Error(e);
      }
    };
    call();
  }, [dataProvider, matchId, isTableActive, isTableDisconnectedModal, dispatch, isTableInGame]);

  useEffect(() => {
    window.onbeforeunload = async () => {
      if (status === constants.statusMatch.active) {
        await changeStatus();
      }
    };
  }, [dataProvider, status, stopTimer, match, changeStatus]);

  const getTeamName = (teamId) => {
    if (teamId === teamA._id) {
      return teamA[models.teams.fields.name];
    }
    return teamB[models.teams.fields.name];
  };

  const removeGoal = async (goal) => {
    await dataProvider(DELETE, constants.resources.goals, { id: goal._id });
    if (goal[models.goals.fields.team] === teamA._id) {
      setTeamAGoals((teamGoals) => teamGoals.filter((teamGoal) => teamGoal !== goal));
    } else {
      setTeamBGoals((teamGoals) => teamGoals.filter((teamGoal) => teamGoal !== goal));
    }
  };

  const showGoalDetailsModal = (goal) => {
    setNewGoal(goal);
    openModalNewGoal(true);
  };

  if (!teamA || !teamB) {
    return null;
  }

  return (
    <LayoutWrapper finishMatch={finishMatch}>
      <div className={classes.main}>
        <Typography variant="h1" align="center" color="textSecondary" className={classes.title}>
          Match
        </Typography>

        <div className={classes.game}>
          <TeamCard team={teamA} teamGoals={teamAGoals} />
          <GameControls
            changeStatus={changeStatus}
            elapsedTimer={elapsedTimer}
            finishMatch={finishMatch}
            status={status}
            startButtonDisabled={(isTableInGame && isTableInGame !== matchId) || !isTableActive}
          />
          <TeamCard team={teamB} teamGoals={teamBGoals} />
        </div>
      </div>

      <GoalsHistory
        getTeamName={getTeamName}
        teamBGoals={teamBGoals}
        showGoalDetailsModal={showGoalDetailsModal}
        teamAGoals={teamAGoals}
        removeGoal={removeGoal}
      />
      <NewGoalModal
        goal={newGoal}
        getTeamName={getTeamName}
        removeGoal={removeGoal}
        isOpen={isGoalModalOpen}
        completedCountdown={completedCountdown}
        onClose={closeModalNewGoal}
      />
      <WarningModal
        isOpen={isTableDisconnectedModal}
        title="Table was disconnected"
        body="Stay calm, your match was paused"
        confirmButtonText="Return to dashboard"
        onClose={onCloseTableDisconnectedModal}
      />
      <WarningModal
        isOpen={isOtherMatchStartedModalVisible}
        title="Another match was started"
        body="Stay calm, your match was paused"
        confirmButtonText="Return to dashboard"
        onClose={onCloseOtherMatchStartedModal}
      />
    </LayoutWrapper>
  );
};
