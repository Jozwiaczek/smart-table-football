import React from 'react';

import { Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary['500'],
    minWidth: '70%',
    padding: '0 0.2em 0.2em 0.2em',
    textAlign: 'center',
  },
}));

const CardStatistic = ({ title, actions, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {title && <CardHeader title={title} />}
      <CardContent>
        <Typography variant="body1">{children}</Typography>
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

CardStatistic.propTypes = {};

export default CardStatistic;
