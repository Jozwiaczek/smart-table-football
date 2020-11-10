import React, { useCallback, useEffect, useState } from 'react';
import { useAuthenticated } from 'react-admin';
import { useHistory } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { constants, models } from 'stf-core';
import { useSelector } from 'react-redux';

import TeamCard from './TeamCard';
import GoalDetailsModal from './modals/GoalDetailsModal';
import { socket } from '../../client/feathersSocketClient';
import WarningModal from './modals/WarningModal';
import GoalsHistory from './GoalsHistory';
import GameControls from './GameControls';
import LayoutWrapper from './LayoutWrapper';
import useGameMatch from './hooks/useGameMatch';
import useGameTeams from './hooks/useGameTeams';
import useCountdown from '../../hooks/useCountdown';

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  game: {
    marginTop: '10em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '2em',
    },
  },
}));

export default () => {
  useAuthenticated();
  const [newGoal, setNewGoal] = useState(null);
  const [isGoalModalOpen, setGoalModalOpen] = useState(false);
  const [isTableDisconnectedModal, setTableDisconnectedModal] = useState(false);
  const [isOtherMatchStartedModalVisible, setOtherMatchStartedModalVisible] = useState(false);
  const {
    match,
    matchId,
    elapsedTimer,
    setElapsedTimer,
    status,
    changeMatchStatus,
    updateMatchGame,
    stopMatchTimer,
    finishMatch,
  } = useGameMatch();
  const {
    teamA,
    teamB,
    teamAGoals,
    teamBGoals,
    setTeamAGoals,
    setTeamBGoals,
    removeMatchGoal,
    getTeamName,
  } = useGameTeams(match);
  const [countdownProgress, startCountdown, clearCountdown] = useCountdown();
  const classes = useStyles();
  const isTableActive = useSelector((state) => state.table.isActive);
  const isTableInGame = useSelector((state) => state.table.isInGame);
  const history = useHistory();

  const closeGoalDetailsModal = useCallback(() => {
    setGoalModalOpen(false);
    clearCountdown();
  }, [clearCountdown]);

  const openGoalDetailsModal = useCallback(
    (instant) => {
      setGoalModalOpen(true);
      if (!instant) {
        startCountdown();
        setTimeout(() => {
          closeGoalDetailsModal();
        }, 6000);
      }
    },
    [startCountdown, closeGoalDetailsModal],
  );

  const openNewGoalDetailsModal = useCallback(
    (goal) => {
      setNewGoal(goal);
      openGoalDetailsModal(true);
    },
    [openGoalDetailsModal],
  );

  const onCloseOtherMatchStartedModal = useCallback(() => {
    setOtherMatchStartedModalVisible(false);
    history.push('/');
  }, [history]);

  const onCloseTableDisconnectedModal = useCallback(async () => {
    setTableDisconnectedModal(false);
    if (status === constants.statusMatch.active) {
      const elapsedTime = stopMatchTimer();
      await updateMatchGame({
        [models.matches.fields.status]: constants.statusMatch.paused,
        [models.matches.fields.elapsedTime]: elapsedTime,
      });
    }
    history.push('/');
  }, [history, status, stopMatchTimer, updateMatchGame]);

  useEffect(() => {
    if (!isTableActive) {
      setTableDisconnectedModal(true);
    }
  }, [isTableActive]);

  useEffect(() => {
    if (matchId && isTableInGame && isTableInGame !== matchId) {
      setOtherMatchStartedModalVisible(true);
    }
  }, [matchId, isTableInGame]);

  useEffect(() => {
    socket.emit(constants.socketEvents.isTableInGame);

    socket.on(constants.socketEvents.currentStepTime, (currentStepTime) => {
      setElapsedTimer(currentStepTime);
    });

    socket.on(constants.socketEvents.createdGoal, ({ goal, forTeam }) => {
      setNewGoal(goal);

      if (forTeam === 'A') {
        setTeamAGoals((teamAGoals) => {
          teamAGoals[teamAGoals.length] = goal;
          return teamAGoals;
        });
      } else {
        setTeamBGoals((teamBGoals) => {
          teamBGoals[teamBGoals.length] = goal;
          return teamBGoals;
        });
      }

      openGoalDetailsModal();
    });
    // eslint-disable-next-line
  }, []);

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
            changeStatus={changeMatchStatus}
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
        showGoalDetailsModal={openNewGoalDetailsModal}
        teamAGoals={teamAGoals}
        removeGoal={removeMatchGoal}
      />
      <GoalDetailsModal
        goal={newGoal}
        getTeamName={getTeamName}
        removeGoal={removeMatchGoal}
        isOpen={isGoalModalOpen}
        countdownProgress={countdownProgress}
        onClose={closeGoalDetailsModal}
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
