import React from 'react'

import { Responsive, SimpleList, TextField } from 'react-admin'
import { ChipField, Datagrid, ReferenceArrayField, SingleFieldList } from 'ra-ui-materialui'

import { Button, makeStyles, Typography } from '@material-ui/core'
import AcceptIcon from '@material-ui/icons/Done'
import RejectIcon from '@material-ui/icons/Cancel'

import { DELETE, refreshView, UPDATE, useDataProvider } from 'ra-core'
import { constants, models } from 'stf-core'
import { getPlayerId } from '../../../../utils/getPlayerId'

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 50
  },
  listTitle: {
    marginLeft: 20
  }
}))

const isArrayFilled = arr => arr && arr.length !== 0

const isPlayerInvited = arr => arr[1][models.teams.fields.invited] === getPlayerId()

const TeamsToAcceptList = ({ data, ids, ...rest }) => {
  const classes = useStyles()
  const dataProvider = useDataProvider()

  let filteredIds = ids
  const filteredData = Object.entries(data).filter(el => {
    if (isArrayFilled(el) && isPlayerInvited(el)) {
      return true
    } else {
      filteredIds = filteredIds.filter(id => id !== el[0])
      return false
    }
  })

  const onAccept = async record => {
    record[models.teams.fields.players].push(record[models.teams.fields.invited])
    await dataProvider(UPDATE, constants.resources.teams, {
      id: record.id,
      data: {
        [models.teams.fields.players]: record[models.teams.fields.players],
        [models.teams.fields.invited]: null
      }
    })
    refreshView()
  }

  const onReject = async record => {
    await dataProvider(DELETE, constants.resources.teams, { id: record._id })
    refreshView()
  }

  const DecisionField = ({ record }) => (
    <div>
      <Button color='primary' onClick={() => onAccept(record)}>
        <AcceptIcon />
          Accept
      </Button>
      <Button>
        <RejectIcon onClick={() => onReject(record)} />
          Reject
      </Button>
    </div>
  )

  if (!isArrayFilled(filteredIds)) return null

  return (
    <div className={classes.container}>
      <Typography
        variant='subtitle'
        className={classes.listTitle}
      >
        To accept
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
            <ReferenceArrayField
              source={models.teams.fields.players}
              reference={constants.resources.players}
              label='From'
            >
              <SingleFieldList>
                <ChipField
                  source={models.players.fields.email}
                />
              </SingleFieldList>
            </ReferenceArrayField>
            <DecisionField />
          </Datagrid>
        }
      />
    </div>
  )
}

TeamsToAcceptList.propTypes = {

}

export default TeamsToAcceptList
