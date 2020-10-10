import React from 'react';
import { Box, Card, CardActions, Button, Typography } from '@material-ui/core';
import SportsSoccerSharpIcon from '@material-ui/icons/SportsSoccerSharp';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import publishArticleImage from './welcome_illustration.svg';
import useLocalStorage from '../../hooks/useLocalStorage';

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
  const [isWatched, setIsWatched] = useLocalStorage('welcomeCardWatched', false);

  if (isWatched) return null;

  return (
    <Card className={classes.root}>
      <Box display="flex">
        <Box flex="1">
          <Typography gutterBottom variant="h4" component="h4">
            Welcome in Smart Table Football! <SportsSoccerSharpIcon />
          </Typography>
          <Box maxWidth="45em">
            <Typography gutterBottom variant="body1" component="p">
              Below you find your dashboard with all statistic from games, teams and all numbers.
              <br />
              For better user experience you can add STF app to your Home Screen (IOS, Android,
              Web).
            </Typography>
          </Box>
          <CardActions className={classes.actions}>
            <Button
              variant="contained"
              startIcon={<CloseIcon />}
              onClick={() => setIsWatched(true)}
            >
              Hide
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
