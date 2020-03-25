/* global localStorage */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { Title, UPDATE, useDataProvider, useLocale, useSetLocale, useTranslate } from 'react-admin'
import { makeStyles } from '@material-ui/core/styles'
import { constants, models } from 'stf-core'
import { getPlayerId } from '../../utils/getPlayerId'
import { setTheme } from '../../redux/actions/theme'

const useStyles = makeStyles({
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' },
  card: { marginTop: '1em' }
})

export default () => {
  const translate = useTranslate()
  const locale = useLocale()
  const setLocale = useSetLocale()
  const classes = useStyles()
  const dataProvider = useDataProvider()
  const dispatch = useDispatch()

  const theme = useSelector(state => state.theme.currentTheme)
  const [isDarkTheme, setIsDarkTheme] = useState(theme.palette.type === 'dark')

  useEffect(() => {
    setIsDarkTheme(theme.palette.type === 'dark')
  }, [theme])

  const setThemeMode = async themeMode => {
    localStorage.setItem('themeMode', themeMode)
    dispatch(setTheme(themeMode))
  }

  return (
    <Card className={classes.card}>
      <Title title={translate('pos.settings')} />
      <CardContent>
        <div className={classes.label}>
          {translate('pos.theme.name')}
        </div>
        <Button
          variant='contained'
          className={classes.button}
          color={isDarkTheme ? 'default' : 'primary'}
          onClick={() => setThemeMode('light')}
        >
          {translate('pos.theme.light')}
        </Button>
        <Button
          variant='contained'
          className={classes.button}
          color={isDarkTheme ? 'primary' : 'default'}
          onClick={() => setThemeMode('dark')}
        >
          {translate('pos.theme.dark')}
        </Button>
      </CardContent>
      <CardContent>
        <div className={classes.label}>{translate('pos.language')}</div>
        <Button
          variant='contained'
          className={classes.button}
          color={locale === constants.locales.en ? 'primary' : 'default'}
          onClick={async () => {
            await dataProvider(UPDATE, constants.resources.players, {
              id: getPlayerId(),
              data: {
                [models.players.fields.locale]: constants.locales.en
              }
            })
            setLocale(constants.locales.en)
          }}
        >
          en
        </Button>
        <Button
          variant='contained'
          className={classes.button}
          color={locale === constants.locales.pl ? 'primary' : 'default'}
          onClick={async () => {
            await dataProvider(UPDATE, constants.resources.players, {
              id: getPlayerId(),
              data: {
                [models.players.fields.locale]: constants.locales.pl
              }
            })
            setLocale(constants.locales.pl)
          }}
        >
          pl
        </Button>
      </CardContent>
    </Card>
  )
}
