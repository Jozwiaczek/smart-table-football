import React, { cloneElement } from 'react';
import { Responsive } from 'react-admin';
import { makeStyles } from '@material-ui/core';
import { constants } from 'stf-core';
import clsx from 'clsx';

import Ball from './Ball';

const useStyles = makeStyles((theme) => ({
  graphic: {
    left: '-5%',
    bottom: '-5%',
    position: 'fixed',
    height: '80vh',
    zIndex: 0,
    opacity: 0.04,
  },
  background: {
    backgroundColor: theme.palette.background.default,
  },
  children: {
    position: 'relative',
    zIndex: 10,
  },
}));

const BackgroundGraphic = ({ children, className, ref }) => {
  const classes = useStyles();
  const themeMode = localStorage.getItem(constants.themeMode.name);
  const fillColor = themeMode === constants.themeMode.type.dark ? '#FFF' : null;

  return (
    <div className={classes.background}>
      <Responsive
        small={<div className={className}>{children}</div>}
        medium={
          <>
            {cloneElement(<Ball fill={fillColor} />, { className: classes.graphic, ref })}
            <div className={clsx(classes.children && className)}>{children}</div>
          </>
        }
      />
    </div>
  );
};

export default BackgroundGraphic;
