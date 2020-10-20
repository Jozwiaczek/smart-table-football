import React, { cloneElement, useEffect, useState } from 'react';
import compose from 'recompose/compose';

import {
  CreateButton,
  DateField,
  Filter,
  GET_LIST,
  List,
  ReferenceField,
  Responsive,
  sanitizeListRestProps,
  SimpleList,
  TextField,
  TopToolbar,
  useRefresh,
  withDataProvider,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';

import { constants, models } from 'stf-core';

import { useSelector } from 'react-redux';

import { Datagrid } from 'ra-ui-materialui';

import DateFilters from '../../elements/DateFilters';
import { getPlayerId } from '../../utils/getPlayerId';
import { socket } from '../../client/feathersSocketClient';
import ShowStatisticButton from './components/ShowStatisticButton';
import ContinueButton from './components/ContinueButton';
import TeamsMobileField from './components/TeamsMobileField';
import WinnerMobileField from './components/WinnerMobileField';
import TimerField from './components/TimerField';

const styles = {
  buttonIcon: {
    marginRight: '0.3em',
  },
};

export const Filters = (props) => (
  <Filter {...props}>
    <TextField alwaysOn label="Email" source={`${models.admins.fields.email}.$regex`} />
    {DateFilters}
  </Filter>
);

const rowStyle = (record = {}, isInGame) => {
  if (isInGame === record.id) {
    return { backgroundColor: 'rgba(255,152,0,0.10)' };
  }
  return {};
};

const MatchList = ({ classes, dataProvider, ...rest }) => {
  const [teams, setTeams] = useState([]);
  const [playerTeamsIds, setPlayerTeamsIds] = useState([]);
  const [globalElapsedTimer, setGlobalElapsedTimer] = useState(0);
  const refresh = useRefresh();

  const tableStatus = useSelector((state) => state.table.isActive);
  const isInGame = useSelector((state) => state.table.isInGame);

  useEffect(() => {
    const call = async () => {
      try {
        const teamsRes = await dataProvider(GET_LIST, constants.resources.teams, {
          filter: {},
        }).then((res) => res.data);
        setTeams(teamsRes);
        const playerTeamsRes = teamsRes.filter((team) =>
          team[models.teams.fields.players].includes(getPlayerId()),
        );
        setPlayerTeamsIds(playerTeamsRes.map((team) => team.id));
      } catch (e) {
        console.error(e);
      }
    };
    call();
  }, [dataProvider, isInGame]);

  useEffect(() => {
    const req = () => {
      socket.on(constants.socketEvents.currentStepTime, (currentStepTime) => {
        setGlobalElapsedTimer(currentStepTime);
      });
    };
    req();
  }, [isInGame, setGlobalElapsedTimer]);

  useEffect(() => {
    const req = () => {
      if (!isInGame) {
        refresh();
      }
    };
    req();
  }, [isInGame, refresh]);

  const ListActions = ({
    className,
    resource,
    filters,
    displayedFilters,
    filterValues,
    basePath,
    showFilter,
    ...rest
  }) => (
    <TopToolbar className={className} {...sanitizeListRestProps(rest)}>
      {filters &&
        cloneElement(filters, {
          resource,
          showFilter,
          displayedFilters,
          filterValues,
          context: 'button',
        })}
      <CreateButton basePath={basePath} disabled={isInGame} />
    </TopToolbar>
  );

  if (!playerTeamsIds || playerTeamsIds.length === 0) {
    return null;
  }

  return (
    <List
      {...rest}
      filters={<Filters />}
      sort={{ field: 'createdAt', order: 'DESC' }}
      actions={<ListActions />}
      filter={{
        $or: [
          {
            [models.matches.fields.teamA]: {
              $in: playerTeamsIds,
            },
          },
          {
            [models.matches.fields.teamB]: {
              $in: playerTeamsIds,
            },
          },
        ],
      }}
    >
      <Responsive
        small={
          <SimpleList
            primaryText={(record) => record && <TeamsMobileField teams={teams} record={record} />}
            secondaryText={(record) =>
              record && <WinnerMobileField teams={teams} record={record} />
            }
            tertiaryText={(record) =>
              record && (
                <>
                  <ContinueButton mobile classes={classes} record={record} {...rest} />
                  <ShowStatisticButton mobile classes={classes} record={record} {...rest} />
                </>
              )
            }
            linkType={false}
          />
        }
        medium={
          <Datagrid rowStyle={(record) => rowStyle(record, isInGame)}>
            <ReferenceField
              source={models.matches.fields.teamA}
              reference={constants.resources.teams}
              label="Team A"
            >
              <TextField source={models.teams.fields.name} />
            </ReferenceField>
            <ReferenceField
              source={models.matches.fields.teamB}
              reference={constants.resources.teams}
              label="Team B"
            >
              <TextField source={models.teams.fields.name} />
            </ReferenceField>
            <ReferenceField
              source={models.matches.fields.winner}
              reference={constants.resources.teams}
            >
              <TextField source={models.teams.fields.name} />
            </ReferenceField>
            <TextField source={models.matches.fields.status} />
            <TimerField
              globalElapsedTimer={globalElapsedTimer}
              classes={classes}
              disabled={!tableStatus}
              isInGame={isInGame}
              label="Timer"
              {...rest}
            />
            <DateField source="createdAt" label="Date" />
            <ContinueButton
              classes={classes}
              disabled={!tableStatus}
              isInGame={isInGame}
              {...rest}
            />
            <ShowStatisticButton classes={classes} {...rest} />
          </Datagrid>
        }
      />
    </List>
  );
};

const enhance = compose(withStyles(styles), withDataProvider);

export default enhance(MatchList);
