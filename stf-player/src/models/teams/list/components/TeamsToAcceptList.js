import React from 'react'

import { Responsive, ShowButton, SimpleList, TextField } from 'react-admin'
import { ChipField, Datagrid, ReferenceArrayField, SingleFieldList } from 'ra-ui-materialui'

import { makeStyles, Typography } from '@material-ui/core'
import { constants, models } from 'stf-core'
import { getPlayerId } from '../../../../utils/getPlayerId'
import DecisionField from '../../elements/DecisionInvitationButton'

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

  let filteredIds = ids
  const filteredData = Object.entries(data).filter(el => {
    if (isArrayFilled(el) && isPlayerInvited(el)) {
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
            <ShowButton />
          </Datagrid>
        }
      />
    </div>
  )
}

export default TeamsToAcceptList
