import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import EqualizerSharpIcon from '@material-ui/icons/EqualizerSharp';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'react-admin';

import CardIcon from '../CardIcon';

const useStyles = makeStyles({
  main: {
    flex: '1',
    marginRight: '1em',
    marginTop: '3em',
    width: '80%',
  },
  card: {
    overflow: 'inherit',
    textAlign: 'right',
    padding: 16,
    minHeight: 52,
  },
  title: {},
});

const WinRatio = ({ value }) => {
  const translate = useTranslate();
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <CardIcon Icon={EqualizerSharpIcon} bgColor="#f57c00" />
      <Card className={classes.card}>
        <Typography className={classes.title} color="textSecondary">
          {translate('pos.dashboard.statisticSection.items.winRatio')}
        </Typography>
        <Typography variant="h5" component="h5">
          {value}%
        </Typography>
      </Card>
    </div>
  );
};

export default WinRatio;
