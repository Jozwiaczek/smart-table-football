import React from 'react'

import { Filter, List, Responsive, SimpleList, TextField } from 'react-admin'

import { models } from 'stf-core'

import DateFilters from '../../elements/DateFilters'
import { Datagrid } from 'ra-ui-materialui'

// const useStyles = makeStyles(() => ({}))

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

const NotificationsList = props => {
  // const classes = useStyles()
  // const dataProvider = useDataProvider()

  return (
    <List
      {...props}
      filters={<Filters />}
    >
      <Responsive
        small={
          <SimpleList
            primaryText={record => <p>primaryText</p>}
            secondaryText={record => <p>secondaryText</p>}
            tertiaryText={record => (
              <p>tertiaryText</p>
            )}
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
  )
}

export default NotificationsList
