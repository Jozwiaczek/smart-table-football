import React from 'react';
import Card from '@material-ui/core/Card';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'react-admin';

import CardIcon from '../CardIcon';

const useStyles = makeStyles({
  main: {
    flex: '1',
    marginRight: '1em',
    marginTop: 20,
    width: '60%',
  },
  card: {
    overflow: 'inherit',
    textAlign: 'right',
    padding: 16,
    minHeight: 52,
  },
  title: {},
});

const GoalsNumber = ({ goals }) => {
  const translate = useTranslate();
  const classes = useStyles();
  const text = goals ? `Total goals: ${goals.length}` : 'You dont have any goals';
  return (
    <div className={classes.main}>
      <CardIcon Icon={SportsSoccerIcon} bgColor="#DE8F0B" />
      <Card className={classes.card}>
        <Typography className={classes.title} color="textSecondary">
          {translate('pos.dashboard.statisticSection.items.numberOfGoals')}
        </Typography>
        <Typography variant="h5" component="h2">
          {text}
        </Typography>
      </Card>
    </div>
  );
};

export default GoalsNumber;
