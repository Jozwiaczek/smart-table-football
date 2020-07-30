import React from 'react'

import { DateField, EditButton, EmailField, Filter, List, Responsive, SimpleList, TextField } from 'react-admin'
import CustomizableDatagrid from 'ra-customizable-datagrid'

import { models } from 'stf-core'

import DateFilters from '../../../elements/DateFilters'
import ApproveButton from '../../../elements/status/ApproveButton'
import rowStyle from '../../../elements/rowStyle'

export const Filters = (props) => (
  <Filter {...props}>
    <TextField
      label='Email'
      source={`${models.admins.fields.email}.$regex`}
      alwaysOn
    />

    {DateFilters}
  </Filter>
)

const AdminsList = props => (
  <List
    {...props}
    filters={<Filters />}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record[models.admins.fields.email]}
        />
      }
      medium={
        <CustomizableDatagrid
          defaultColumns={[
            models.admins.fields.email,
            models.admins.fields.status
          ]}
          rowStyle={rowStyle}
        >
          <TextField source='_id' />
          <EmailField source={models.admins.fields.email} />
          <ApproveButton source={models.admins.fields.status} />
          <DateField source='createdAt' />
          <DateField source='updatedAt' />
          <EditButton />
        </CustomizableDatagrid>
      }
    />
  </List>
)

export default AdminsList
