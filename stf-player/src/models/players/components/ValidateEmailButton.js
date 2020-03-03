import { constants, models } from '@sbody/sbody-core'
import React from 'react'
import { Button } from '@material-ui/core'
import Send from '@material-ui/icons/Send'
import SectionTitle from '../../../elements/SectionTitle'

const _sendVerificationEmail = async (dataProvider, client, showNotification) => {
  try {
    await dataProvider('CREATE', constants.resources.clientAuthManagement, {
      data: {
        action: 'resendVerifySignup',
        value: {
          email: client[models.clients.fields.email],
          trainerSite: client[models.clients.fields.trainerSite]
        }
      }
    })
    showNotification('Verification email sent', 'info')
  } catch (e) {
    showNotification('Verification email not sent', 'warning')
    console.log('e ===', e)
  }
}

const ValidateEmailButton = ({ dataProvider, client, classes, showNotification }) => {
  if (client[models.authManagementSchema.isVerified]) {
    return null
  }

  return (
    <>
      <SectionTitle variant='body2' className={classes.sectionTitle} >
        Validate your email
      </SectionTitle>
      <Button
        className={classes.buttonContained}
        onClick={() => _sendVerificationEmail(dataProvider, client, showNotification)}
        variant={'contained'}
        color={'primary'}
      >
        <Send style={{ marginRight: '0.5rem' }} />
        send verification email
      </Button>
    </>
  )
}

export default ValidateEmailButton
