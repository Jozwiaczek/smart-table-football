import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Title, UPDATE, useDataProvider, useLocale, useSetLocale, useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { constants, models } from 'stf-core';

import { Typography } from '@material-ui/core';

import { getPlayerId } from '../../utils/getPlayerId';
import { setTheme } from '../../redux/actions/theme';

const useStyles = makeStyles({
  card: {
    marginTop: '1em',
  },
  cardTitle: {
    margin: '1em 0 1em 0.5em',
  },
  cardContentTitle: {
    width: '10em',
    display: 'inline-block',
  },
  button: {
    margin: '1em',
  },
});

export default () => {
  const translate = useTranslate();
  const locale = useLocale();
  const setLocale = useSetLocale();
  const classes = useStyles();
  const dataProvider = useDataProvider();
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.currentTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(
    theme.palette.type === constants.themeMode.type.dark,
  );

  useEffect(() => {
    setIsDarkTheme(theme.palette.type === constants.themeMode.type.dark);
  }, [theme]);

  const setThemeMode = async (themeMode) => {
    localStorage.setItem(constants.themeMode.name, themeMode);
    dispatch(setTheme(themeMode));
  };

  return (
    <Card className={classes.card}>
      <Title title={translate('pos.settings')} />
      <Typography variant="h4" component="h4" color="textPrimary" className={classes.cardTitle}>
        {translate('pos.settings')}
      </Typography>
      <CardContent>
        <div className={classes.cardContentTitle}>{translate('pos.theme.name')}</div>
        <div>
          <Button
            variant="contained"
            className={classes.button}
            color={isDarkTheme ? 'default' : 'primary'}
            onClick={() => setThemeMode(constants.themeMode.type.light)}
          >
            {translate('pos.theme.light')}
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            color={isDarkTheme ? 'primary' : 'default'}
            onClick={() => setThemeMode(constants.themeMode.type.dark)}
          >
            {translate('pos.theme.dark')}
          </Button>
        </div>
      </CardContent>
      <CardContent>
        <div className={classes.cardContentTitle}>{translate('pos.language')}</div>
        <div>
          <Button
            variant="contained"
            className={classes.button}
            color={locale === constants.locales.en ? 'primary' : 'default'}
            onClick={async () => {
              await dataProvider(UPDATE, constants.resources.players, {
                id: getPlayerId(),
                data: {
                  [models.players.fields.locale]: constants.locales.en,
                },
              });
              setLocale(constants.locales.en);
            }}
          >
            en
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            color={locale === constants.locales.pl ? 'primary' : 'default'}
            onClick={async () => {
              await dataProvider(UPDATE, constants.resources.players, {
                id: getPlayerId(),
                data: {
                  [models.players.fields.locale]: constants.locales.pl,
                },
              });
              setLocale(constants.locales.pl);
            }}
          >
            pl
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
