import React from 'react';
import { Box, Card, CardActions, Button, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import { makeStyles } from '@material-ui/core/styles';

import publishArticleImage from './welcome_illustration.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    background: `linear-gradient(to right, #ff922b 0%, #ffb74d 50%), linear-gradient(to bottom, #ff9800 0%, #ff922b 50%), #ffb74d`,
    color: '#fff',
    padding: 20,
    marginTop: theme.spacing(2),
    marginBottom: '1em',
  },
  media: {
    background: `url(${publishArticleImage}) top right / cover`,
    marginLeft: 'auto',
  },
  actions: {
    [theme.breakpoints.down('md')]: {
      padding: 0,
      flexWrap: 'wrap',
      marginTop: '2em',
      '& a': {
        marginTop: '2em',
        marginLeft: '0!important',
        marginRight: '1em',
      },
    },
  },
}));

const WelcomeCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <Box display="flex">
        <Box flex="1">
          <Typography gutterBottom variant="h5" component="h2">
            Welcome to the Smart Table Football
          </Typography>
          <Box maxWidth="40em">
            <Typography gutterBottom variant="body1" component="p">
              Below you find your dashboard with all statistic from games, teams and all numbers.
              Below you find your dashboard with all statistic from games, teams and all numbers.
            </Typography>
          </Box>
          <CardActions className={classes.actions}>
            <Button
              variant="contained"
              href="https://marmelab.com/react-admin"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Button
              variant="contained"
              href="https://github.com/marmelab/react-admin/tree/master/examples/demo"
              startIcon={<CodeIcon />}
            >
              Demo
            </Button>
          </CardActions>
        </Box>

        <Box
          display={{ xs: 'none', sm: 'none', md: 'block' }}
          className={classes.media}
          width="16em"
          height="9em"
          overflow="hidden"
        />
      </Box>
    </Card>
  );
};

export default WelcomeCard;
