import React from 'react';
import PropTypes from 'prop-types';

import { models } from 'stf-core';

import { Card, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  teamCard: {
    padding: 30,
    width: 320,
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      padding: 30,
      width: 300,
      height: 160,
    },
  },
  goalsNumber: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '3.5em',
    },
  },
}));

const TeamCard = ({ team, teamGoals }) => {
  const classes = useStyles();
  return (
    <Card className={classes.teamCard}>
      <Typography gutterBottom variant="h5" align="center" color="textSecondary">
        {team[models.teams.fields.name]}
      </Typography>
      <Typography variant="h1" className={classes.goalsNumber}>
        {teamGoals.length}
      </Typography>
    </Card>
  );
};

TeamCard.propTypes = {
  team: PropTypes.object.isRequired,
  teamGoals: PropTypes.array.isRequired,
};

export default TeamCard;
