import React, { Component } from 'react'
import { constants } from 'stf-core'
import ContentSave from '@material-ui/icons/Save'
import { FormDataConsumer, Mutation, Toolbar } from 'react-admin'
import { Button } from '@material-ui/core'

class ClientEditToolbar extends Component {
  constructor (props) {
    super(props)

    this.options = {
      undoable: true,
      onSuccess: {
        notification: { body: 'resources.clients.notification.saveChanges.success', level: 'info' }
      },
      onError: {
        notification: { body: 'resources.clients.notification.saveChanges.failure', level: 'warning' }
      }
    }

    this.saveChangesRender = this.saveChangesRender.bind(this)
  }

  saveChangesRender (props) {
    return (
      <Mutation
        type='UPDATE'
        resource={constants.resources.clients}
        payload={{
          id: props.record._id,
          data: props.formData
        }}
        options={this.options}
      >
        {(approve) => (
          <Button
            variant='contained'
            color='primary'
            onClick={approve}
          >
            <ContentSave style={{ marginRight: '0.5rem' }} />
            Save changes
          </Button>
        )}
      </Mutation>
    )
  }

  render () {
    const {
      location,
      basePath,
      record
    } = this.props

    if (location.pathname === `${basePath}/${record._id}/basic` ||
    location.pathname === `${basePath}/${record._id}/account`) {
      return (
        <Toolbar {...this.props}>
          <FormDataConsumer>
            {this.saveChangesRender}
          </FormDataConsumer>
        </Toolbar>
      )
    }

    if (this.props.location.pathname === `${this.props.basePath}/${this.props.record._id}/actions`) {
      return null
    }
  }
}

export default ClientEditToolbar
