import React, { Component } from 'react';
import { constants } from 'stf-core';
import ContentSave from '@material-ui/icons/Save';
import { FormDataConsumer, Mutation, Toolbar } from 'react-admin';
import { Button } from '@material-ui/core';
import { withTranslate } from 'ra-core';

class PlayerEditToolbar extends Component {
  constructor(props) {
    super(props);

    this.options = {
      undoable: true,
      onSuccess: {
        notification: { body: 'resources.players.notification.saveChanges.success', level: 'info' },
      },
      onError: {
        notification: {
          body: 'resources.players.notification.saveChanges.failure',
          level: 'warning',
        },
      },
    };

    this.saveChangesRender = this.saveChangesRender.bind(this);
  }

  saveChangesRender(props) {
    const { translate } = this.props;
    return (
      <Mutation
        type="UPDATE"
        resource={constants.resources.players}
        payload={{
          id: props.record._id,
          data: props.formData,
        }}
        options={this.options}
      >
        {(approve) => (
          <Button variant="contained" color="primary" onClick={approve}>
            <ContentSave style={{ marginRight: '0.5rem' }} />
            {translate('global.saveChanges')}
          </Button>
        )}
      </Mutation>
    );
  }

  render() {
    const { location, basePath, record } = this.props;

    if (
      location.pathname === `${basePath}/${record._id}/basic` ||
      location.pathname === `${basePath}/${record._id}/account`
    ) {
      return (
        <Toolbar {...this.props}>
          <FormDataConsumer>{this.saveChangesRender}</FormDataConsumer>
        </Toolbar>
      );
    }

    if (location.pathname === `${basePath}/${record._id}/actions`) {
      return null;
    }
  }
}

export default withTranslate(PlayerEditToolbar);
