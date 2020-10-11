import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';

import { constants } from 'stf-core';

import { setTheme } from '../redux/actions/theme';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeWrapper = ({ children }) => {
  const theme = useSelector((state) => state.theme.currentTheme);
  const dispatch = useDispatch();
  const [themeMode] = useLocalStorage(constants.themeMode.name, constants.themeMode.type.light);

  useEffect(() => {
    dispatch(setTheme(themeMode));
  }, [dispatch, themeMode]);
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

ThemeWrapper.propTypes = {
  children: PropTypes.array.isRequired,
};

export default ThemeWrapper;
