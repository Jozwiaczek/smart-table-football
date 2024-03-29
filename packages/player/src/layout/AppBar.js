import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, GET_ONE, useDataProvider, useTranslate } from 'react-admin';
import SignalIcon from '@material-ui/icons/Power';
import NoSignalIcon from '@material-ui/icons/PowerOff';
import TableAvailableIcon from '@material-ui/icons/DoubleArrow';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TableBusyIcon from '@material-ui/icons/CancelScheduleSend';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, useMediaQuery } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { constants, models } from 'stf-core';

import { getPlayerId } from '../utils/getPlayerId';
import NotificationsMenu from './notifications/NotficationsMenu';
import UserMenu from './UserMenu';
import GlobalStyles from './GlobalStyles';

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  spacer: {
    flex: 1,
  },
  betaTag: {
    color: theme.palette.primary.contrastText,
    border: `2px solid ${theme.palette.primary.contrastText}`,
    padding: '0.1rem 0.4rem',
    borderRadius: '5px',
    marginRight: '1rem',
    lineHeight: 1,
  },
  strengthSignalIcon: {
    marginRight: '0.5rem',
  },
  noSignalContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  disconnectText: {
    marginLeft: '0.75rem',
    paddingTop: '0.2rem',
  },
  iconDivider: {
    marginLeft: '1rem',
    fontSize: 32,
    fontWeight: 300,
  },
}));

const TableStatusItem = ({ classes, isTableActive, isSmall }) => {
  const translate = useTranslate();

  if (isTableActive) {
    return (
      <Tooltip title={translate('layout.appBar.tableStatus.connected')}>
        <SignalIcon />
      </Tooltip>
    );
  }

  return (
    <div className={classes.strengthSignalIcon}>
      <div className={classes.noSignalContainer}>
        <NoSignalIcon />
        {!isSmall && (
          <Typography className={classes.disconnectText}>
            {translate('layout.appBar.tableStatus.disconnected')}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default (props) => {
  const isTableActive = useSelector((state) => state.table.isActive);
  const isTableInGame = useSelector((state) => state.table.isInGame);
  const [isPlayerInGame, setPlayerInGame] = useState(false);
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const classes = useStyles();
  const dataProvider = useDataProvider();
  const translate = useTranslate();

  useEffect(() => {
    const save = async () => {
      if (isTableInGame) {
        // new approach
        const matchInGame = await dataProvider(GET_ONE, constants.resources.matches, {
          id: isTableInGame,
        }).then((res) => res.data);

        const isPlayerInTeamA = await dataProvider(GET_ONE, constants.resources.teams, {
          id: matchInGame[models.matches.fields.teamA],
        }).then((res) => res.data);

        const isPlayerInTeamB = await dataProvider(GET_ONE, constants.resources.teams, {
          id: matchInGame[models.matches.fields.teamB],
        }).then((res) => res.data);

        setPlayerInGame(
          isPlayerInTeamA[models.teams.fields.players].includes(getPlayerId()) ||
            isPlayerInTeamB[models.teams.fields.players].includes(getPlayerId()),
        );

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
    };
    save();
  }, [isTableInGame, dataProvider]);

  const TableInGameSection = () => {
    const history = useHistory();

    if (!isTableActive) return null;

    if (isTableInGame) {
      if (isPlayerInGame) {
        return (
          <Tooltip title={translate('layout.appBar.tableStatus.join.tooltip')}>
            <Button
              color="action"
              onClick={() => history.push({ pathname: '/game', search: `?match=${isTableInGame}` })}
            >
              <EmojiPeopleIcon className={classes.buttonIcon} color="action" />
              {translate('layout.appBar.tableStatus.join.button')}
            </Button>
          </Tooltip>
        );
      }
      return (
        <Tooltip title={translate('layout.appBar.tableStatus.busy')}>
          <TableBusyIcon />
        </Tooltip>
      );
    }

    return (
      <Tooltip title={translate('layout.appBar.tableStatus.ready')}>
        <TableAvailableIcon />
      </Tooltip>
    );
  };

  return (
    <AppBar {...props} color="primary" userMenu={<UserMenu />}>
      {!isSmall && (
        <Typography variant="h6" color="inherit" className={classes.title} id="react-admin-title" />
      )}

      <span className={classes.spacer} />

      {!isSmall && (
        <Typography className={classes.betaTag} variant="button">
          beta
        </Typography>
      )}

      <TableStatusItem classes={classes} isSmall={isSmall} isTableActive={isTableActive} />
      <TableInGameSection {...props} />
      <Typography className={classes.iconDivider}>|</Typography>
      <NotificationsMenu />
      <GlobalStyles />
    </AppBar>
  );
};
