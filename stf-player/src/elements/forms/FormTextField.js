import React from 'react'
import { TextField } from '@material-ui/core'

export default ({
  meta: { touched, error } = { touched: false, error: '' },
  input: { ...inputProps },
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
