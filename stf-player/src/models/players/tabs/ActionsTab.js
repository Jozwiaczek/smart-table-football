import React from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'

import {
  TextInput,
  FormTab,
  DELETE,
  userLogout,
  showNotification,
  withDataProvider,
  FormDataConsumer,
  REDUX_FORM_NAME,
  CREATE
} from 'react-admin'

import { Button } from '@material-ui/core'
import Security from '@material-ui/icons/Security'

import { models, constants } from '@sbody/sbody-core'
import ConfirmDeleteButton from '../../../elements/ConfirmDeleteButton'
import SectionTitle from '../../../elements/SectionTitle'
import ValidateEmailButton from './../components/ValidateEmailButton'

const changePasswordRender = ({ dataProvider, classes, showNotification, reduxForm, loading }) => ({ formData, record }) => {
  const changePassword = async () => {
    try {
      await dataProvider(CREATE, constants.resources.clientAuthManagement, {
        data: {
          action: 'passwordChange',
          value: {
            user: { email: record.email },
            password: formData.password,
            oldPassword: formData.oldPassword
          }
        }
      })
      showNotification('resources.clients.notification.saveChanges.success', 'info')
    } catch (e) {
      showNotification(e.message, 'warning')
    }
  }
  const recordForm = reduxForm[REDUX_FORM_NAME]
  let syncErrors = {}
  if (recordForm) {
    syncErrors = recordForm.syncErrors
  }
  return (
    <Button
      variant={'contained'}
      color={'primary'}
      onClick={changePassword}
      className={classes.buttonContained}
      disabled={!!syncErrors || loading}
    >
      <Security className={classes.buttonIcon} />
      Change Password
    </Button>
  )
}

const ActionTab = ({
  theme,
  classes,
  dataProvider,
  client,
  reduxForm,
  loading,
  showNotification,
  hasList,
  hasEdit,
  hasCreate,
  hasShow,
  userLogout,
  dispatch,
  basePath,
  ...rest
}) => (
  <FormTab style={{ color: theme.palette.text.primary }} label={'Actions'} {...rest}>
    <SectionTitle variant='body2' className={classes.sectionTitle} >
      Change password
    </SectionTitle>
    <TextInput
      source={'oldPassword'}
      type='password'
    />
    <TextInput
      source={models.clients.fields.password}
      type='password'
    />
    <TextInput
      source='Confirm password'
      type='password'
    />
    <FormDataConsumer classes={classes}>
      {changePasswordRender({ dataProvider, classes, showNotification, reduxForm, loading })}
    </FormDataConsumer>
    <ValidateEmailButton dataProvider={dataProvider} client={client} classes={classes} showNotification={showNotification} />
    <SectionTitle variant='body2' className={classes.sectionTitle} >
      Delete account
    </SectionTitle>
    <ConfirmDeleteButton
      {...rest}
      label={'Delete account'}
      variant={'contained'}
      className={classes.buttonContained}
      onConfirm={async record => {
        await dataProvider(DELETE, constants.resources.clients, {
          id: record._id
        })
        userLogout()
      }}
    />
  </FormTab>
)

const matchStateToProps = {
  userLogout,
  showNotification
}

const mapStateToProps = state => ({
  reduxForm: state.form,
  loading: state.admin.loading
})

const enhance = compose(
  withDataProvider,
  connect(mapStateToProps, matchStateToProps)
)

export default enhance(ActionTab)
