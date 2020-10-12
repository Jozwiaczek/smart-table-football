import React from 'react';
import Card from '@material-ui/core/Card';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'react-admin';

import CardIcon from '../CardIcon';

const useStyles = makeStyles({
  main: {
    flex: '1',
    marginRight: '1em',
    marginTop: '3em',
    marginBottom: '2em',
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

const MatchesInWeek = ({ value }) => {
  const t = useTranslate();
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <CardIcon Icon={EmojiFlagsIcon} bgColor="#e65100" />
      <Card className={classes.card}>
        <Typography className={classes.title} color="textSecondary">
          {t('pos.dashboard.statisticSection.items.matchesInWeek')}
        </Typography>
        <Typography variant="h5" component="h5">
          {value}
          <EmojiFlagsIcon />
        </Typography>
      </Card>
    </div>
  );
};

export default MatchesInWeek;
