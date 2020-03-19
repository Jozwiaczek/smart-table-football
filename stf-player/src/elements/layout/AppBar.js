import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { AppBar, MenuItemLink, UserMenu, useTranslate } from 'react-admin'
import SettingsIcon from '@material-ui/icons/Settings'
import SignalIcon from '@material-ui/icons/Wifi'
import NoSignalIcon from '@material-ui/icons/WifiOff'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, useMediaQuery } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'

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
    marginRight: '1rem',
    lineHeight: 1
  },
  strengthSignalIcon: {
    marginRight: '0.5rem'
  },
  noSignalContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  disconnectText: {
    marginLeft: '0.75rem',
    paddingTop: '0.2rem'
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

const CustomUserMenu = (props) =>
  <UserMenu {...props}>
    <ConfigurationMenu />
  </UserMenu>

export default (props) => {
  const tableStatus = useSelector(state => state.table.isActive)

  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const classes = useStyles()

  return (
    <AppBar {...props} userMenu={<CustomUserMenu />}>
      {
        !isSmall &&
        <Typography
          variant='h6'
          color='inherit'
          className={classes.title}
          id='react-admin-title'
        />
      }

      <span className={classes.spacer} />

      {
        !isSmall &&
        <Typography
          className={classes.betaTag}
          variant={'button'}>
          beta
        </Typography>
      }

      <div className={classes.strengthSignalIcon}>
        {
          tableStatus
            ? <Tooltip title='Table is connected'>
              <SignalIcon />
            </Tooltip>
            : <div className={classes.noSignalContainer} {...props}>
              <NoSignalIcon />
              {
                !isSmall &&
                <Typography className={classes.disconnectText}>
              Table is disconnected
                </Typography>
              }
            </div>
        }
      </div>
    </AppBar>
  )
}
