import React from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'

import { Edit, TabbedForm } from 'react-admin'

import { withStyles } from '@material-ui/core'

import { models } from 'stf-core'
import ClientEditToolbar from './components/ClientEditToolbar'
import { getPlayerId } from '../../utils/getPlayerId'
import ActionTab from './tabs/ActionsTab'
import PersonalTab from './tabs/PersonalTab'
import AccountTab from './tabs/AccountTab'

const styles = () => ({
  buttonContained: {
    marginBottom: '1rem',
    width: '16rem',
    fontSize: '0.85rem'
  },
  sectionTitle: {
    textAlign: 'bottom'
  },
  deleteAccountBtn: {
    marginBottom: '3rem'
  },
  loadingBar: {
    marginRight: '0.5rem',
    display: 'flex',
    alignItems: 'center'
  }
})

const validatePasswordChange = (values) => {
  const errors = {}
  if (!values[models.players.fields.password]) {
    errors[models.players.fields.password] = 'Required'
  } else if (values[models.players.fields.password].length < 6) {
    errors[models.players.fields.password] = 'Password must contain at least 6 characters'
  } else if (values[models.players.fields.password] !== values['confirmPassword']) {
    errors['Confirm password'] = 'Password must be the same as above'
  }

  if (!values['oldPassword']) {
    errors['oldPassword'] = 'Required'
  }

  if (!values['confirmPassword']) {
    errors['Confirm password'] = 'Required'
  }

  return errors
}

const _PlayerEdit = ({
  location,
  classes,
  players,
  loading,
  ...props
}) => {
  if (!players || !players.data) {
    return null
  }
  const player = players.data[getPlayerId()]

  return (
    <Edit
      title='Profile'
      actions={null}
      {...props}
    >
      <TabbedForm
        validate={validatePasswordChange}
        toolbar={
          <ClientEditToolbar
            location={location}
          />
        }
      >
        <PersonalTab
          path={'basic'}
          classes={classes}
          {...props}
        />
        <AccountTab
          path={'account'}
          classes={classes}
          {...props}
        />
        <ActionTab
          path={'actions'}
          classes={classes}
          player={player}
          {...props}
        />
      </TabbedForm>
    </Edit>
  )
}

const mapStateToProps = state => ({
  players: state.admin.resources.players
})
const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, {})
)

export const PlayerEdit = enhance(_PlayerEdit)
