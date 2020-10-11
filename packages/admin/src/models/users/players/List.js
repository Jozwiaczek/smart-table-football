import React from 'react';

import {
  DateField,
  EditButton,
  EmailField,
  Filter,
  FunctionField,
  List,
  Responsive,
  SimpleList,
  TextField,
  ImageField,
} from 'react-admin';
import CustomizableDatagrid from 'ra-customizable-datagrid';

import VerifiedUser from '@material-ui/icons/VerifiedUser';

import { models } from 'stf-core';

import { makeStyles } from '@material-ui/core/styles';

import DateFilters from '../../../elements/DateFilters';
import ApproveButton from '../../../elements/status/ApproveButton';
import rowStyle from '../../../elements/rowStyle';

export const Filters = (props) => (
  <Filter {...props}>
    <TextField alwaysOn label="Email" source={`${models.admins.fields.email}.$regex`} />
    {DateFilters}
  </Filter>
);

const _getRightIcon = (record) => {
  if (record[models.players.fields.isVerified]) return <VerifiedUser />;
  return <span />;
};

const useStyles = makeStyles({
  avatar: {
    '& img': {
      maxHeight: 30,
    },
  },
});

const PlayersList = (props) => {
  const classes = useStyles();

  return (
    <List {...props} filters={<Filters />}>
      <Responsive
        small={
          <SimpleList
            primaryText={(record) => record[models.players.fields.email]}
            secondaryText={(record) =>
              `${record[models.players.fields.firstName]} ${record[models.players.fields.lastName]}`
            }
            rightIcon={_getRightIcon}
          />
        }
        medium={
          <CustomizableDatagrid
            defaultColumns={[models.players.fields.email, 'name', models.players.fields.status]}
            rowStyle={rowStyle}
          >
            <ImageField source={models.players.fields.avatar} className={classes.avatar} />
            <TextField source="_id" />
            <EmailField source={models.players.fields.email} />
            <FunctionField
              source="name"
              render={(record) =>
                `${record[models.players.fields.firstName]} ${
                  record[models.players.fields.lastName]
                }`
              }
            />
            <ApproveButton source={models.players.fields.status} />
            <TextField source={models.players.fields.locale} />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
            <EditButton />
          </CustomizableDatagrid>
        }
      />
    </List>
  );
};

export default PlayersList;
