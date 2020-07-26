import React from 'react'
import PropTypes from 'prop-types'

import { models } from 'stf-core'

import { Card, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  teamCard: {
    padding: '1rem',
    width: '12em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.primary.main
  }
}))

const TeamCard = ({ team, teamGoals }) => {
  const classes = useStyles()
  return (
    <Card className={classes.teamCard}>
      <Typography variant='h4' align='center'>
        {team[models.teams.fields.name]}
      </Typography>
      <Typography variant='h3'>
        {teamGoals.length}
      </Typography>
    </Card>
  )
}

TeamCard.propTypes = {
  team: PropTypes.object.isRequired,
  teamGoals: PropTypes.array.isRequired
}

export default TeamCard
