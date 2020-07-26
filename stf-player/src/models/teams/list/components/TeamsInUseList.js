import React from 'react'
import {
  ChipField,
  EditButton,
  ReferenceArrayField,
  Responsive,
  SimpleList,
  SingleFieldList,
  TextField
} from 'react-admin'
import { constants, models } from 'stf-core'
import { getPlayerId } from 'stf-player/src/utils/getPlayerId'
import { Datagrid } from 'ra-ui-materialui'

const isArrayFilled = arr => arr && arr.length !== 0

const isTeamBelongsToPlayer = arr => arr[1][models.teams.fields.players].includes(getPlayerId())

const isTeamPending = arr => isArrayFilled(arr) && !!arr[1][models.teams.fields.invited]

const TeamsInUseList = ({ data, ids, ...rest }) => {
  let filteredIds = ids
  const filteredData = Object.entries(data).filter(el => {
    if ((isArrayFilled(el) && !isTeamBelongsToPlayer(el)) || isTeamPending(el)) {
      filteredIds = filteredIds.filter(id => id !== el[0])
      return false
    } else {
      return true
    }
  })

  if (!isArrayFilled(filteredIds)) return null

  return (
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
          >
            <SingleFieldList>
              <ChipField
                source={models.players.fields.email}
              />
            </SingleFieldList>
          </ReferenceArrayField>
          <EditButton />
        </Datagrid>
      }
    />
  )
}

TeamsInUseList.propTypes = {

}

export default TeamsInUseList
