import React from 'react'
import compose from 'recompose/compose'

import {
  Create,
  SimpleForm,
  TextInput,
  TopToolbar,
  ListButton,
  required,
  ReferenceArrayInput,
  SelectArrayInput,
  RadioButtonGroupInput, Link
} from 'react-admin'

import { Field, Form } from 'react-final-form'

import {
  CardActions,
  Button,
  TextField,
  CircularProgress,
  CardContent
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'

import {
  constants,
  models
} from 'stf-core'

const styles = {
  form: {
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    marginTop: '1em',
    width: '100%',
    height: '4em'
  },
  button: {
    width: '100%',
    margin: 2
  },
  loadingBar: {
    marginRight: 8
  },
  resetLink: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem'
  }
}

const CreateActions = ({ basePath }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
  </TopToolbar>
)

const Test = ({ choices, input, ...rest }) => {
  return (
    <SelectArrayInput optionText={models.players.fields.email} choices={choices} {...rest} />
  )
}

const FullNameField = ({ record }) => record.name === 'single' ? <PersonIcon /> : <PeopleAltIcon />

const Input = ({
  meta: { touched, error }, // eslint-disable-line react/prop-types
  input: inputProps, // eslint-disable-line react/prop-types
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
)

const TeamCreate = ({ classes, ...rest }) => {
  const [loading, setLoading] = React.useState(false)

  const validate = (values) => {
    const errors = { username: undefined, password: undefined }

    if (!values.username) {
      errors.username = 'Required'
    }
    return errors
  }

  const submit = values => {
    setLoading(true)
    console.log(values)
    setLoading(false)
  }

  return (
    <Form
      onSubmit={submit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Field
            autoFocus
            id='username'
            name='username'
            component={Input}
            label={'Email'}
            disabled={loading}
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            disabled={loading}
            className={classes.button}
          >
            {
              loading &&
              <div className={classes.loadingBar} >
                <CircularProgress size={15} thickness={2} />
              </div>
            }
            Create
          </Button>
        </form>
      )}
    />
  )
}

// const TeamCreate = (props) => {
//   return (
//     <Create
//       {...props}
//       actions={<CreateActions />}
//       title={'Team Create'}
//     >
//       <SimpleForm>
//         <RadioButtonGroupInput
//           source='type'
//           optionText={<FullNameField />}
//           choices={[
//             { id: 'single', name: 'single' },
//             { id: 'pair', name: 'pair' }
//           ]}
//         />
//         <TextInput
//           source={models.teams.fields.name}
//           validate={required()}
//         />
//         <ReferenceArrayInput
//           source={models.teams.fields.players}
//           reference={constants.resources.players}
//           validate={required()}
//           label={'Team mate'}
//           sort={{
//             field: models.players.fields.email,
//             order: 'ASC'
//           }}
//           filterToQuery={searchText => ({ [`${models.players.fields.email}.$regex`]: searchText })}
//         >
//           <Test />
//         </ReferenceArrayInput>
//       </SimpleForm>
//     </Create>
//   )
// }

const enhance = compose(
  withStyles(styles)
)

export default enhance(TeamCreate)
