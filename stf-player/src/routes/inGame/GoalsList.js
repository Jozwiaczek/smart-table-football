import PropTypes from 'prop-types'
import React from 'react'

import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
  Typography,
  withStyles
} from '@material-ui/core'

import SportsSoccerIcon from '@material-ui/icons/SportsSoccer'
import DeleteIcon from '@material-ui/icons/Delete'

import { models } from '../../../../stf-core'

const styles = () => ({
  listContainer: {
    minWidth: '5em'
  }
})

const getTime = time => {
  const date = new Date(time)
  const hours = date.getHours() === 0 ? '00' : date.getHours()
  const min = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes()
  return `${hours}:${min}`
}

const GoalsList = ({ title, goals, classes, removeGoal, getTeamName, onItemClick }) => {
  return (
    <div className={classes.listContainer}>
      <Typography variant={'h4'} align={'center'}>
        {title}
      </Typography>
      <List> {/* TODO add possibility for mark GREAT GOALS || Add button show all goals */}
        {goals.map(goal => {
          return (
            <ListItem
              key={goal._id}
              button
              onClick={() => onItemClick(goal)}
            >
              <ListItemAvatar>
                <Avatar>
                  <SportsSoccerIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={getTeamName(goal[models.goals.fields.team])}
                secondary={getTime(goal.createdAt)}
              />
              <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
                <IconButton edge='end' onClick={async () => removeGoal(goal)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}

GoalsList.propTypes = {
  getTeamName: PropTypes.func.isRequired,
  removeGoal: PropTypes.any.isRequired,
  goals: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(GoalsList)
