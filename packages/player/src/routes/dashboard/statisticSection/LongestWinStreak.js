import React from 'react';
import Card from '@material-ui/core/Card';
import WhatshotSharpIcon from '@material-ui/icons/WhatshotSharp';
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

const LongestWinStreak = ({ wins }) => {
  const t = useTranslate();
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <CardIcon Icon={WhatshotSharpIcon} bgColor="#ffa726" />
      <Card className={classes.card}>
        <Typography className={classes.title} color="textSecondary">
          {t('pos.dashboard.statisticSection.items.longestWinStreak')}
        </Typography>
        <Typography variant="h5" component="h5">
          {wins} <WhatshotSharpIcon />
        </Typography>
      </Card>
    </div>
  );
};

export default LongestWinStreak;
