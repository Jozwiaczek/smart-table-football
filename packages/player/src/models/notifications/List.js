import React from 'react';

import { Filter, List, Responsive, SimpleList, TextField } from 'react-admin';

import { models } from 'stf-core';

import { Datagrid } from 'ra-ui-materialui';

import DateFilters from '../../elements/DateFilters';

// const useStyles = makeStyles(() => ({}))

export const Filters = (props) => (
  <Filter {...props}>
    <TextField alwaysOn label="Email" source={`${models.admins.fields.email}.$regex`} />

    {DateFilters}
  </Filter>
);

const NotificationsList = (props) => {
  // const classes = useStyles()
  // const dataProvider = useDataProvider()

  return (
    <List {...props} filters={<Filters />}>
      <Responsive
        small={
          <SimpleList
            primaryText={() => <p>primaryText</p>}
            secondaryText={() => <p>secondaryText</p>}
            tertiaryText={() => <p>tertiaryText</p>}
            linkType={false}
          />
        }
        medium={
          <Datagrid>
            <TextField source={models.notifications.fields.message} />
          </Datagrid>
        }
      />
    </List>
  );
};

export default NotificationsList;
