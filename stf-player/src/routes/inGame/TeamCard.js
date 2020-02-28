import React from 'react'
import PropTypes from 'prop-types'

import { models } from 'stf-core'

import {
  Typography,
  Card,
  withStyles
} from '@material-ui/core'

const styles = () => ({
  teamCard: {
    padding: '1rem',
    width: '12em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxSizing: 'border-box'
  }
})

const TeamCard = ({ theme, classes, team, teamGoals }) => {
  return (
    <Card className={classes.teamCard} style={{ backgroundColor: theme.palette.primary.main }}>
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
  classes: PropTypes.object,
  team: PropTypes.object.isRequired,
  teamGoals: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles)(TeamCard)
