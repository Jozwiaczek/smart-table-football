import React from 'react'

import { List, Responsive, SimpleList, TextField } from 'react-admin'
import CustomizableDatagrid from 'ra-customizable-datagrid'

import { models } from 'stf-core'

const TableList = (props) =>
  <List
    {...props}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record[models.table.fields.id]}
          secondaryText={record => record[models.table.fields.isActive]}
        />
      }
      medium={
        <CustomizableDatagrid
          defaultColumns={[
            models.table.fields.isActive
          ]}
        >
          <TextField source={models.table.fields.isActive} />
        </CustomizableDatagrid>
      }
    />
  </List>

export default TableList
