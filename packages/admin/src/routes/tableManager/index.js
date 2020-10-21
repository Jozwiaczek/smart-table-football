import React, { useCallback, useEffect, useState } from 'react';

import { Title, useNotify } from 'react-admin';

import { Button, Card, CardContent, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import SignalIcon from '@material-ui/icons/Power';
import NoSignalIcon from '@material-ui/icons/PowerOff';
import HistoryIcon from '@material-ui/icons/History';

import { constants } from 'stf-core';

import DisconnectedIcon from '@material-ui/icons/Cancel';
import ConnectedIcon from '@material-ui/icons/VerifiedUser';

import moment from 'moment';

import useLocalStorage from '../../raHooks/useLocalStorage';
import { socket } from '../../client/feathersSocketClient';

import SectionTitle from '../../elements/SectionTitle';

const useStyles = makeStyles({
  card: {
    marginTop: '1em',
  },
  tableStateButton: {
    marginRight: 20,
  },
  tableUpdateButton: {
    marginRight: 20,
  },
  clearLogsButton: {
    marginTop: 20,
  },
  sectionContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  logsContainer: {
    marginTop: 10,
    height: 400,
    width: '95%',
    padding: 10,
    border: '2px solid #283593',
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4rem',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#283593',
      borderRadius: 10,
    },
  },
  log: {
    whiteSpace: 'pre-wrap',
  },
  loadingBar: {
    marginLeft: 8,
  },
  tableManagerTabLabelContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 170,
  },
});

export default () => {
  const classes = useStyles();
  const notify = useNotify();
  const [isTableRunning, setTableRunning] = useState(false);
  const [isManagerRunning, setManagerRunning] = useState(false);
  const [tableLogs, setTableLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useLocalStorage('lastUpdate', new Date());

  const manageTableWorkingState = useCallback(() => {
    if (!isManagerRunning) {
      notify('Table Manager is offline', 'warning');
      return;
    }

    if (isTableRunning) {
      socket.emit(constants.socketEvents.manager, constants.managerActions.turnOff);
      setTableRunning(false);
      notify('Table turned off');
      return;
    }

    socket.emit(constants.socketEvents.manager, constants.managerActions.turnOn);
    setTableRunning(true);
    notify('Table turned on');
  }, [isManagerRunning, isTableRunning, notify]);

  const updateTable = useCallback(() => {
    if (!isManagerRunning) {
      notify('Table Manager is offline', 'warning');
      return;
    }
    setLoading(true);
    socket.emit(constants.socketEvents.manager, constants.managerActions.update);
  }, [isManagerRunning, notify]);

  const clearTableLogs = useCallback(() => {
    if (!isManagerRunning) {
      notify('Table Manager is offline', 'warning');
      return;
    }

    socket.emit(constants.socketEvents.clearLogs);
    setTableLogs([]);
    notify('Logs cleaned');
  }, [isManagerRunning, notify]);

  useEffect(() => {
    socket.emit(constants.socketEvents.isManagerRunning);
    socket.on(constants.socketEvents.managerRunning, () => {
      setManagerRunning(true);
    });

    socket.on(constants.socketEvents.managerUpdated, (status) => {
      setLoading(false);
      if (status === 'up-to-date') {
        notify('Changes not detected. System is up to date');
        return;
      }
      setLastUpdate(status);
      notify('System updated');
    });

    socket.on(constants.socketEvents.managerLogs, (logs) => {
      setTableLogs(logs);
    });

    socket.emit(constants.socketEvents.isTableActivePlayer);
    socket.on(constants.socketEvents.isTableActivePlayer, (isActive) => setTableRunning(isActive));
    // eslint-disable-next-line
  }, []);

  const TableManagerTabLabel = () => {
    let icon = <DisconnectedIcon color="error" />;

    if (isManagerRunning) {
      icon = <ConnectedIcon color="primary" />;
    }

    return (
      <div className={classes.tableManagerTabLabelContainer}>
        <h3>Table Manager</h3>
        {icon}
      </div>
    );
  };

  return (
    <Card className={classes.card}>
      <Title title="Table Manager" />
      <CardContent>
        <TableManagerTabLabel />
        <SectionTitle>Table actions</SectionTitle>
        <div className={classes.sectionContainer}>
          <Button
            variant="contained"
            className={classes.tableStateButton}
            disabled={loading || !isManagerRunning}
            onClick={manageTableWorkingState}
          >
            {isTableRunning ? 'Turn Off Table' : 'Turn On Table'}
          </Button>
          {isTableRunning ? (
            <Tooltip title="Table is running">
              <SignalIcon color="primary" />
            </Tooltip>
          ) : (
            <Tooltip title="Table is suspended">
              <NoSignalIcon color="error" />
            </Tooltip>
          )}
        </div>
        <div className={classes.sectionContainer}>
          <Button
            variant="contained"
            className={classes.tableUpdateButton}
            disabled={loading || !isManagerRunning}
            onClick={updateTable}
          >
            Update Table
            {loading && (
              <div className={classes.loadingBar}>
                <CircularProgress size={15} thickness={2} />
              </div>
            )}
          </Button>
          <Tooltip title="Last update">
            <HistoryIcon />
          </Tooltip>
          &nbsp;
          {moment(lastUpdate).startOf('second').fromNow()}
        </div>

        <SectionTitle>Table console</SectionTitle>
        <div className={classes.logsContainer}>
          {tableLogs.map((tableLog, index) => (
            <p key={index} className={classes.log}>
              {tableLog}
            </p>
          ))}
        </div>
        <Button
          variant="contained"
          className={classes.clearLogsButton}
          disabled={loading || !isManagerRunning}
          onClick={clearTableLogs}
        >
          Clear logs
        </Button>
      </CardContent>
    </Card>
  );
};
