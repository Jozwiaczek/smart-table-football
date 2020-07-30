import PropTypes from 'prop-types'
import { constants, models } from 'stf-core'
import { DELETE, UPDATE, useDataProvider } from 'ra-core'
import { Button } from '@material-ui/core'
import AcceptIcon from '@material-ui/icons/Done'
import RejectIcon from '@material-ui/icons/Cancel'
import React from 'react'

const DecisionField = ({ record }) => {
  const dataProvider = useDataProvider()

  const onAccept = async record => {
    record[models.teams.fields.players].push(record[models.teams.fields.invited])
    await dataProvider(UPDATE, constants.resources.teams, {
      id: record.id,
      data: {
        [models.teams.fields.players]: record[models.teams.fields.players],
        [models.teams.fields.invited]: null
      }
    })
  }

  const onReject = async record => {
    await dataProvider(DELETE, constants.resources.teams, { id: record._id })
  }

  return (
    <div>
      <Button color='primary' onClick={() => onAccept(record)}>
        <AcceptIcon />
        Accept
      </Button>
      <Button onClick={() => onReject(record)}>
        <RejectIcon />
        Reject
      </Button>
    </div>
  )
}

DecisionField.propTypes = {
  record: PropTypes.object
}

export default DecisionField
