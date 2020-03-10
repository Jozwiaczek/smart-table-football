import React, { forwardRef } from 'react'
import { AppBar, UserMenu, MenuItemLink, useTranslate } from 'react-admin'
import Typography from '@material-ui/core/Typography'
import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  spacer: {
    flex: 1
  },
  betaTag: {
    color: theme.palette.primary.contrastText,
    border: `2px solid ${theme.palette.primary.contrastText}`,
    padding: '0.1rem 0.4rem',
    borderRadius: '5px',
    marginRight: '0.75rem',
    lineHeight: 1
  }
}))

const ConfigurationMenu = forwardRef((props, ref) => {
  const translate = useTranslate()
  return (
    <MenuItemLink
      ref={ref}
      to='/settings'
      primaryText={translate('pos.settings')}
      leftIcon={<SettingsIcon />}
      onClick={props.onClick}
    />
  )
})

const CustomUserMenu = (props) => (
  <UserMenu {...props}>
    <ConfigurationMenu />
  </UserMenu>
)

export default (props) => {
  const classes = useStyles()
  return (
    <AppBar {...props} userMenu={<CustomUserMenu />}>
      <Typography
        variant='h6'
        color='inherit'
        className={classes.title}
        id='react-admin-title'
      />
      <span className={classes.spacer} />
      <Typography
        className={classes.betaTag}
        variant={'button'}>
        beta
      </Typography>
    </AppBar>
  )
}
