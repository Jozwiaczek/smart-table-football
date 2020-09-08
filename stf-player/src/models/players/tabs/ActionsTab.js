import React, { useState } from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import {
  CREATE,
  DELETE,
  FormDataConsumer,
  FormTab,
  showNotification,
  TextInput,
  userLogout,
  withDataProvider,
} from 'react-admin';

import { Button, CircularProgress } from '@material-ui/core';
import Security from '@material-ui/icons/Security';

import { constants, models } from 'stf-core';

import ConfirmDeleteButton from '../../../elements/ConfirmDeleteButton';
import SectionTitle from '../../../elements/SectionTitle';
import ValidateEmailButton from '../components/ValidateEmailButton';

const changePasswordRender = ({ dataProvider, classes, showNotification, loading }) => ({
  formData,
  record,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const changePassword = async () => {
    try {
      setIsLoading(true);

      await dataProvider(CREATE, constants.resources.playerAuthManagement, {
        data: {
          action: 'passwordChange',
          value: {
            user: { email: record.email },
            password: formData.password,
            oldPassword: formData.oldPassword,
          },
        },
      });
      showNotification('resources.players.notification.saveChanges.success', 'info');
    } catch (e) {
      showNotification(e.message, 'warning');
    } finally {
      setIsLoading(false);
    }
  };

  const getBtnContent = () => {
    if (isLoading) {
      return (
        <div className={classes.loadingBar}>
          <CircularProgress size={17} thickness={2} />
        </div>
      );
    }
    return (
      <>
        <Security className={classes.buttonIcon} style={{ marginRight: '0.5rem' }} />
        Change Password
      </>
    );
  };

  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.buttonContained}
      disabled={loading || isLoading}
      onClick={changePassword}
    >
      {getBtnContent()}
    </Button>
  );
};

const ActionTab = ({
  classes,
  dataProvider,
  player,
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
  <FormTab label="Actions" {...rest}>
    <SectionTitle className={classes.sectionTitle}>Change password</SectionTitle>
    <TextInput source="oldPassword" type="password" />
    <TextInput source={models.players.fields.password} type="password" label="New password" />
    <TextInput source="confirmPassword" type="password" label="Confirm new password" />
    <FormDataConsumer classes={classes}>
      {changePasswordRender({ dataProvider, classes, showNotification, loading })}
    </FormDataConsumer>
    <ValidateEmailButton
      dataProvider={dataProvider}
      player={player}
      classes={classes}
      showNotification={showNotification}
    />
    <SectionTitle className={classes.sectionTitle}>Delete account</SectionTitle>
    <ConfirmDeleteButton
      {...rest}
      label="Delete account"
      variant="contained"
      className={classes.buttonContained && classes.deleteAccountBtn}
      onConfirm={async (record) => {
        await dataProvider(DELETE, constants.resources.players, {
          id: record._id,
        });
        userLogout();
      }}
    />
  </FormTab>
);

const matchStateToProps = {
  userLogout,
  showNotification,
};

const mapStateToProps = (state) => ({
  loading: state.admin.loading,
});

const enhance = compose(withDataProvider, connect(mapStateToProps, matchStateToProps));

export default enhance(ActionTab);
