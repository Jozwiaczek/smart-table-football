import React, { forwardRef } from 'react'
import { AppBar, UserMenu, MenuItemLink, useTranslate } from 'react-admin'
import Typography from '@material-ui/core/Typography'
import SettingsIcon from '@material-ui/icons/Settings'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  spacer: {
    flex: 1
  }
})

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
    </AppBar>
  )
}
