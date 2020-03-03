import { constants, models } from 'stf-core'
import React from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import Send from '@material-ui/icons/Send'
import SectionTitle from '../../../elements/SectionTitle'

const _sendVerificationEmail = async (dataProvider, player, showNotification, setIsLoading) => {
  try {
    setIsLoading(true)
    await dataProvider('CREATE', constants.resources.playerAuthManagement, {
      data: {
        action: 'resendVerifySignup',
        value: {
          email: player[models.players.fields.email],
          trainerSite: player[models.players.fields.trainerSite]
        }
      }
    })
    showNotification('Verification email sent', 'info')
  } catch (e) {
    showNotification('Verification email not sent', 'warning')
    console.error(e)
  } finally {
    setIsLoading(false)
  }
}

const ValidateEmailButton = ({ dataProvider, player, classes, showNotification }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  if (player[models.authManagementSchema.isVerified]) {
    return null
  }

  return (
    <>
      <SectionTitle className={classes.sectionTitle} >
        Validate your email
      </SectionTitle>
      <Button
        className={classes.buttonContained}
        onClick={() => _sendVerificationEmail(dataProvider, player, showNotification, setIsLoading)}
        variant={'contained'}
        color={'primary'}
        disabled={isLoading}
      >
        {isLoading
          ? <div className={classes.loadingBar}>
            <CircularProgress size={17} thickness={2} />
          </div>
          : <Send style={{ marginRight: '0.5rem' }} />
        }
        send verification email
      </Button>
    </>
  )
}

export default ValidateEmailButton
