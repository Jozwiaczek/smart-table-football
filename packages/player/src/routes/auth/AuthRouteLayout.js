import React from 'react';
import { Notification } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

import GlobalStyles from '../../layout/theme/GlobalStyles';
import BackgroundGraphic from '../../elements/BackgroundGraphic';
import ThemeWrapper from '../../elements/ThemeWrapper';
import Logo from '../../elements/Logo';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '1rem',
    width: '100%',
    minWidth: 200,
    maxWidth: 400,
    margin: '50px 0',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  logo: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const AuthRouteLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <ThemeWrapper>
      <BackgroundGraphic className={classes.main}>
        <Card className={classes.card}>
          <Logo className={classes.logo} linkTo="/login" />
          {children}
          <Notification />
        </Card>
        <GlobalStyles />
      </BackgroundGraphic>
    </ThemeWrapper>
  );
};

export default AuthRouteLayout;
