import React from 'react'

import { EditButton, ReferenceField, Responsive, SimpleList, TextField } from 'react-admin'
import { makeStyles, Typography } from '@material-ui/core'

import { constants, models } from 'stf-core'
import { getPlayerId } from 'stf-player/src/utils/getPlayerId'
import { Datagrid } from 'ra-ui-materialui'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 100
  },
  listTitle: {
    marginLeft: 20
  }
}))

const isArrayFilled = arr => arr && arr.length !== 0

const isTeamBelongsToPlayer = arr => arr[1][models.teams.fields.players].includes(getPlayerId())

const isTeamPending = arr => !!arr[1][models.teams.fields.invited]

const TeamsPendingList = ({ data, ids, ...rest }) => {
  const classes = useStyles()

  if (!ids) {
    return null
  }

  let filteredIds = ids
  const filteredData = Object.entries(data).filter(el => {
    if (isArrayFilled(el) && isTeamBelongsToPlayer(el) && isTeamPending(el)) {
      return true
    } else {
      filteredIds = filteredIds.filter(id => id !== el[0])
      return false
    }
  })

  if (!isArrayFilled(filteredIds)) return null

  return (
    <div className={classes.container}>
      <Typography
        variant='subtitle'
        className={classes.listTitle}
      >
        Pending
      </Typography>
      <Responsive
        {...rest}
        ids={filteredIds}
        data={Object.fromEntries(filteredData)}
        small={
          <SimpleList
            primaryText={record => record[models.teams.fields.name]}
          />
        }
        medium={
          <Datagrid>
            <TextField source={models.teams.fields.name} />
            <ReferenceField
              source={models.teams.fields.invited}
              reference={constants.resources.players}
            >
              <TextField source={models.players.fields.email} />
            </ReferenceField>
            <EditButton />
          </Datagrid>
        }
      />
    </div>
  )
}

export default TeamsPendingList
