import React, { useEffect, useState } from 'react';

import { GET_LIST, Title, useDataProvider } from 'react-admin';

import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { constants, models } from 'stf-core';

import { getPlayerId } from '../../utils/getPlayerId';

import List from '../../elements/list';
import MessageTableCell from './components/MessageTableCell';
import DateTableCell from './components/DateTableCell';

const headCells = [
  { id: 'message', numeric: false, disablePadding: false, label: 'Message' },
  { id: 'createdAt', numeric: true, disablePadding: false, label: 'Date' },
];

const useStyles = makeStyles({
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' },
  card: { marginTop: '1em' },
});

export default () => {
  const classes = useStyles();
  const dataProvider = useDataProvider();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const req = async () => {
      setNotifications(
        (
          await dataProvider(GET_LIST, constants.resources.notifications, {
            filter: {
              [models.notifications.fields.player]: getPlayerId(),
            },
          })
        ).data,
      );
    };
    req();
  }, [dataProvider]);

  return (
    <Card className={classes.card}>
      <Title title="Notifications" />
      <CardContent>
        <List
          source={models.notifications.name}
          data={notifications}
          headCells={headCells}
          onRowClick={(event, row) => console.log('test')}
        >
          <MessageTableCell />
          <DateTableCell />
        </List>
      </CardContent>
    </Card>
  );
};
