import React from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'

import {
  Edit,
  TabbedForm
} from 'react-admin'

import { withStyles } from '@material-ui/core'
import { withTheme } from '@material-ui/core/styles'

import { models } from 'stf-core'
import ClientEditToolbar from './components/ClientEditToolbar'
import { getPlayerId } from '../../utils/getPlayerId'
import ActionTab from './tabs/ActionsTab'
import PersonalTab from './tabs/PersonalTab'
import AccountTab from './tabs/AccountTab'

const styles = () => ({
  buttonContained: {
    margin: '1rem 0 0',
    width: '16rem'
  },
  actionTitle: {
    marginTop: '1.5rem'
  },
  sectionTitle: {
    textAlign: 'bottom',
    margin: '1.5rem 0 0 0'
  }
})

const validatePasswordChange = (values) => {
  const errors = {}
  if (!values[models.trainers.fields.password]) {
    errors[models.trainers.fields.password] = 'Required'
  } else if (values[models.trainers.fields.password].length < 6) {
    errors[models.trainers.fields.password] = 'Password must contain at least 6 characters'
  } else if (values[models.trainers.fields.password] !== values['Confirm password']) {
    errors['Confirm password'] = 'Password must be the same as above'
  }

  if (!values['oldPassword']) {
    errors['oldPassword'] = 'Required'
  }

  if (!values['Confirm password']) {
    errors['Confirm password'] = 'Required'
  }

  return errors
}

const _ClientEdit = ({
  location,
  theme,
  classes,
  clients,
  loading,
  ...props
}) => {
  if (!clients || !clients.data) {
    return null
  }
  const client = clients.data[getPlayerId()]

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
          theme={theme}
          classes={classes}
          {...props}
        />
        <AccountTab
          path={'account'}
          theme={theme}
          classes={classes}
          {...props}
        />
        <ActionTab
          path={'actions'}
          theme={theme}
          classes={classes}
          client={client}
          {...props}
        />
      </TabbedForm>
    </Edit>
  )
}

const mapStateToProps = state => ({
  clients: state.admin.resources.clients
})
const enhance = compose(
  withStyles(styles),
  withTheme(),
  connect(mapStateToProps, {})
)

export const ClientEdit = enhance(_ClientEdit)
