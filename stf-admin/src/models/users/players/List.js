import React from 'react'

import {
  List,
  DateField,
  EmailField,
  Filter,
  SearchInput,
  TextField,
  Responsive,
  SimpleList,
  EditButton,
  FunctionField
} from 'react-admin'
import CustomizableDatagrid from 'ra-customizable-datagrid'

import VerifiedUser from '@material-ui/icons/VerifiedUser'

import {
  models
} from 'stf-core'

import DateFilters from '../../../elements/DateFilters'
import ApproveButton from '../../../elements/status/ApproveButton'
import rowStyle from '../../../elements/rowStyle'

export const Filters = (props) => (
  <Filter {...props}>
    <SearchInput
      label='Email'
      source={`${models.admins.fields.email}.$regex`}
      alwaysOn
    />

    {DateFilters}
  </Filter>
)

const _getRightIcon = (record) => {
  if (record[models.players.fields.isVerified]) return <VerifiedUser />
  return <span />
}

const PlayersList = props => (
  <List
    {...props}
    filters={<Filters />}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record[models.players.fields.email]}
          secondaryText={record => `${record[models.players.fields.firstName]} ${record[models.players.fields.lastName]}`}
          rightIcon={_getRightIcon}
        />
      }
      medium={
        <CustomizableDatagrid
          defaultColumns={[
            models.players.fields.email,
            'name',
            models.players.fields.status
          ]}
          rowStyle={rowStyle}
        >
          <TextField source='_id' />
          <EmailField source={models.admins.fields.email} />
          <FunctionField
            source={'name'}
            render={record => `${record[models.players.fields.firstName]} ${record[models.players.fields.lastName]}`}
          />
          <ApproveButton source={models.players.fields.status} />
          <DateField source='createdAt' />
          <DateField source='updatedAt' />
          <EditButton />
        </CustomizableDatagrid>
      }
    />
  </List>
)

export default PlayersList
