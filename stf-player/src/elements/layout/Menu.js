import React from 'react'
import { connect, useSelector } from 'react-redux'
import compose from 'recompose/compose'
import { getResources, MenuItemLink, Responsive, toggleSidebar } from 'react-admin'
import { useTranslate } from 'ra-core'
import { withRouter } from 'react-router-dom'
import List from '@material-ui/core/List'
import Person from '@material-ui/icons/Person'

import { constants } from 'stf-core'
import { getPlayerId } from '../../utils/getPlayerId'

import Dashboard from '@material-ui/icons/Dashboard'
import Group from '@material-ui/icons/Group'
import Casino from '@material-ui/icons/Casino'

import { Typography, withStyles, withWidth } from '@material-ui/core'

const styles = theme => ({
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  betaTag: {
    color: theme.palette.primary.main,
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    padding: '0.1rem 0.2rem',
    borderRadius: '5px',
    lineHeight: 1.1,
    fontSize: '0.65rem'
  }
})

const BetaTag = withStyles(styles)(({ classes }) => (
  <Typography
    className={classes.betaTag}
    variant='button'
  >
    beta
  </Typography>
))

const onMenuTap = (props) => {
  if (props.width === 'xs') {
    props.toggleSidebar(props)
  }
}

const Menu = props => {
  const playerId = getPlayerId()
  const open = useSelector(state => state.admin.ui.sidebarOpen)
  const translate = useTranslate()

  return (
    <List>
      <MenuItemLink
        to='/'
        isActive={active => active.isExact}
        primaryText={<div className={props.classes.menuItem}>{translate('pos.menu.dashboard')} <BetaTag /></div>}
        onClick={() => onMenuTap(props)}
        leftIcon={<Dashboard />}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to={`/${constants.resources.players}/${playerId}/basic`}
        primaryText={<div className={props.classes.menuItem}>{translate('pos.menu.profile')}</div>}
        onClick={() => onMenuTap(props)}
        leftIcon={<Person />}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to={`/${constants.resources.teams}`}
        primaryText={<div className={props.classes.menuItem}>{translate('pos.menu.teams')}</div>}
        onClick={() => onMenuTap(props)}
        leftIcon={<Group />}
        sidebarIsOpen={open}
      />
      <MenuItemLink
        to={`/${constants.resources.matches}`}
        primaryText={<div className={props.classes.menuItem}>{translate('pos.menu.matches')}</div>}
        onClick={() => onMenuTap(props)}
        leftIcon={<Casino />}
        sidebarIsOpen={open}
      />
      <Responsive
        small={props.logout}
        medium={null} // Pass null to render nothing on larger devices
      />
    </List>
  )
}

const mapStateToProps = state => ({
  resources: getResources(state)
})

const mapDispatchToProps = {
  toggleSidebar
}

const enhance = compose(
  withStyles(styles),
  withRouter,
  withWidth(),
  connect(mapStateToProps, mapDispatchToProps)
)

export default enhance(Menu)
