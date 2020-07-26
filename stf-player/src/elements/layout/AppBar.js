import React, { forwardRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { AppBar, GET_ONE, MenuItemLink, useDataProvider, UserMenu, useTranslate } from 'react-admin'
import SettingsIcon from '@material-ui/icons/Settings'
import SignalIcon from '@material-ui/icons/Power'
import NoSignalIcon from '@material-ui/icons/PowerOff'
import TableAvailableIcon from '@material-ui/icons/DoubleArrow'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import TableBusyIcon from '@material-ui/icons/CancelScheduleSend'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography, useMediaQuery } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip/Tooltip'
import { constants, models } from 'stf-core'
import { getPlayerId } from '../../utils/getPlayerId'
import NotificationsMenu from './NotficationsMenu'

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
  },
  iconDivider: {
    marginLeft: '1rem',
    fontSize: 32,
    fontWeight: 300
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

const TableStatusItem = ({ classes, isTableActive, isSmall }) => {
  if (isTableActive) {
    return (
      <Tooltip title='Table is connected'>
        <SignalIcon />
      </Tooltip>
    )
  }

  return (
    <div className={classes.strengthSignalIcon}>
      <div className={classes.noSignalContainer}>
        <NoSignalIcon />
        {
          !isSmall &&
            <Typography className={classes.disconnectText}>
                Table is disconnected
            </Typography>
        }
      </div>
    </div>
  )
}

export default (props) => {
  const isTableActive = useSelector(state => state.table.isActive)
  const isTableInGame = useSelector(state => state.table.isInGame)
  const [isPlayerInGame, setPlayerInGame] = useState(false)
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const classes = useStyles()
  const dataProvider = useDataProvider()

  useEffect(() => {
    const save = async () => {
      if (isTableInGame) {
        // new approach
        const matchInGame = await dataProvider(GET_ONE, constants.resources.matches, {
          id: isTableInGame
        }).then(res => res.data)

        const isPlayerInTeamA = await dataProvider(GET_ONE, constants.resources.teams, {
          id: matchInGame[models.matches.fields.teamA]
        }).then(res => res.data)

        const isPlayerInTeamB = await dataProvider(GET_ONE, constants.resources.teams, {
          id: matchInGame[models.matches.fields.teamB]
        }).then(res => res.data)

        setPlayerInGame(isPlayerInTeamA[models.teams.fields.players].includes(getPlayerId()) ||
          isPlayerInTeamB[models.teams.fields.players].includes(getPlayerId()))

        // Old approach
        // const teamsRes = await dataProvider(GET_LIST, constants.resources.teams, { filter: {
        //   $where: () => this[models.teams.fields.players].includes(getPlayerId())
        // } }).then(res => res.data)
        // const teamsIds = teamsRes.map(team => team.id)
        // const matchRes = await dataProvider(GET_LIST, constants.resources.matches, { filter: {
        //   $or: [
        //     { [models.matches.fields.teamA]: {
        //       $in: teamsIds
        //     } },
        //     {
        //       [models.matches.fields.teamB]: {
        //         $in: teamsIds
        //       }
        //     }
        //   ],
        //   [models.matches.fields.status]: constants.statusMatch.active
        // } }).then(res => res.data[0])
      }
    }
    save()
  }, [isTableInGame, dataProvider])

  const TableInGameSection = () => {
    const history = useHistory()

    if (!isTableActive) return null
    if (isTableInGame) {
      if (isPlayerInGame) {
        return (
          <Tooltip title='Click to join your current match'>
            <Button color='action' onClick={() => history.push({ pathname: '/inGame', search: `?match=${isTableInGame}` })}>
              <EmojiPeopleIcon className={classes.buttonIcon} color='action' />
              Join
            </Button>
          </Tooltip>
        )
      }
      return (
        <Tooltip title='There is an active match'>
          <TableBusyIcon />
        </Tooltip>
      )
    }
    return (
      <Tooltip title='Ready to play!'>
        <TableAvailableIcon />
      </Tooltip>
    )
  }

  return (
    <AppBar {...props} color='primary' userMenu={<CustomUserMenu />}>
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

      {!isSmall &&
        <Typography
          className={classes.betaTag}
          variant='button'
        >
          beta
        </Typography>}

      <TableStatusItem
        classes={classes}
        isSmall={isSmall}
        isTableActive={isTableActive}
      />
      <TableInGameSection {...props} />
      <Typography className={classes.iconDivider}>
        |
      </Typography>
      <NotificationsMenu />
    </AppBar>
  )
}
