import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import {
  InputAdornment,
  withStyles,
  TextField
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

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

  return (
    <TextField
      error={!!(touched && error)}
      helperText={touched && error}
      type={passwordIsMasked ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            {passwordIsMasked
              ? <VisibilityIcon
                className={classes.eye}
                onClick={togglePasswordMask}
                color={'primary'}
              />
              : <VisibilityOffIcon
                className={classes.eye}
                onClick={togglePasswordMask}
                color={'primary'}
              />
            }
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
