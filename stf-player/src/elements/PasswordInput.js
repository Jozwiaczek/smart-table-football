import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import {
  InputAdornment,
  withStyles,
  TextField
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const styles = () => ({
  eye: {
    cursor: 'pointer'
  }
})

const PasswordInput = ({
  meta: { touched, error } = { touched: false, error: '' },
  input: { ...inputProps },
  classes,
  ...rest
}) => {
  const [passwordIsMasked, setPasswordIsMasked] = React.useState(true)

  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked)
  }

  const VisibilityIcon = () => {
    if (passwordIsMasked) {
      return (
        <Visibility
          className={classes.eye}
          onClick={togglePasswordMask}
          color='primary'
        />
      )
    }
    return (
      <VisibilityOff
        className={classes.eye}
        onClick={togglePasswordMask}
        color='primary'
      />
    )
  }

  return (
    <TextField
      error={!!(touched && error)}
      helperText={touched && error}
      type={passwordIsMasked ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <VisibilityIcon />
          </InputAdornment>
        )
      }}
      {...inputProps}
      {...rest}
      fullWidth
    />
  )
}

PasswordInput.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.func
}

const enhance = compose(
  withStyles(styles)
)

export default enhance(PasswordInput)
