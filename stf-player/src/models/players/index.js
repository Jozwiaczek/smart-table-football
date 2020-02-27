import React from 'react'

import { DateField, Edit, FormTab, required, TabbedForm, TextInput } from 'react-admin'

import { withStyles } from '@material-ui/core/styles'

import { models } from 'stf-core'

const styles = {
  fullWidth: {
    width: '100%'
  }
}

const _PlayerEdit = (props) => (
  <Edit
    {...props}
    actions={null}
    title='Profile'
  >
    <TabbedForm
      redirect={false}
    >
      <FormTab
        label='summary'
        path='basic'
      >
        <TextInput
          source={models.players.fields.email}
          type='email'
          validate={required()}
        />
        <TextInput
          source={models.players.fields.firstName}
          validate={required()}
        />
        <TextInput
          source={models.players.fields.lastName}
          validate={required()}
        />
        <DateField source='createdAt' showTime />
        <DateField source='updatedAt' showTime />
      </FormTab>

      {/* <FormTab label='verify'> */}
      {/*  <ButtonInput */}
      {/*    label='resources.users.actions.verifySignupLong.label' */}
      {/*    buttonLabel='resources.users.actions.verifySignupLong.buttonLabel' */}
      {/*    action={clientAuthManagementActionFactory('verifySignupLong', (id, data) => ({ */}
      {/*      value: data[models.players.fields.verifyToken] || '' */}
      {/*    }))} */}
      {/*  > */}
      {/*    <VerifiedUser /> */}
      {/*  </ButtonInput> */}
      {/*  <ButtonInput */}
      {/*    label='resources.users.actions.verifySignupShort.label' */}
      {/*    buttonLabel='resources.users.actions.verifySignupShort.buttonLabel' */}
      {/*    action={clientAuthManagementActionFactory('verifySignupShort', (id, data) => ({ */}
      {/*      value: { */}
      {/*        user: { */}
      {/*          email: data[models.players.fields.email] */}
      {/*        }, */}
      {/*        token: data[models.players.fields.verifyShortToken] || '' */}
      {/*      } */}
      {/*    }))} */}
      {/*  > */}
      {/*    <VerifiedUser /> */}
      {/*  </ButtonInput> */}
      {/*  <BooleanInput source={models.players.fields.isVerified} /> */}
      {/*  <DateTimeInput source={models.players.fields.verifyExpires} /> */}
      {/* </FormTab> */}

      {/* <FormTab label='password reset'> */}
      {/*  <ButtonInput */}
      {/*    label='resources.users.actions.sendResetPwd.label' */}
      {/*    buttonLabel='resources.users.actions.sendResetPwd.buttonLabel' */}
      {/*    action={clientAuthManagementActionFactory('sendResetPwd', (id, data) => ({ */}
      {/*      value: { */}
      {/*        email: data[models.players.fields.email] */}
      {/*      } */}
      {/*    }))} */}
      {/*  > */}
      {/*    <Send /> */}
      {/*  </ButtonInput> */}
      {/*  <DateTimeInput source={models.players.fields.resetExpires} /> */}
      {/* </FormTab> */}

    </TabbedForm>
  </Edit>
)

export const PlayerEdit = withStyles(styles)(_PlayerEdit)
