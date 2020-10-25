import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';

import GoalsList from './GoalsList';

const useStyles = makeStyles(() => ({
  goalsList: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  goalsHistoryContainer: {
    minHeight: 400,
  },
}));

const GoalsHistory = ({
  getTeamName,
  teamAGoals,
  teamBGoals,
  removeGoal,
  showGoalDetailsModal,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.goalsHistoryContainer}>
      <Typography align="center" variant="h3" color="textSecondary">
        Goals history
      </Typography>
      <div className={classes.goalsList}>
        <GoalsList
          title="Team A"
          getTeamName={getTeamName}
          goals={teamAGoals}
          removeGoal={removeGoal}
          onItemClick={showGoalDetailsModal}
        />
        <GoalsList
          title="Team B"
          getTeamName={getTeamName}
          goals={teamBGoals}
          removeGoal={removeGoal}
          onItemClick={showGoalDetailsModal}
        />
      </div>
    </div>
  );
};

GoalsHistory.propTypes = {
  getTeamName: PropTypes.func.isRequired,
  removeGoal: PropTypes.func.isRequired,
  showGoalDetailsModal: PropTypes.func.isRequired,
  teamAGoals: PropTypes.array.isRequired,
  teamBGoals: PropTypes.array.isRequired,
};

export default GoalsHistory;
