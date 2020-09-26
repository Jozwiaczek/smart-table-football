import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, withStyles, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = () => ({
  eye: {
    cursor: 'pointer',
  },
});

const PasswordInput = ({
  meta: { touched, error } = { touched: false, error: '' },
  input: { ...inputProps },
  classes,
  ...rest
}) => {
  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked);
  };

  const VisibilityIcon = () => {
    if (!inputProps.value) return null;

    if (passwordIsMasked) {
      return <VisibilityOff className={classes.eye} color="primary" onClick={togglePasswordMask} />;
    }
    return <Visibility className={classes.eye} color="primary" onClick={togglePasswordMask} />;
  };

  return (
    <TextField
      error={!!(touched && error)}
      helperText={touched && error}
      type={passwordIsMasked ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <VisibilityIcon />
          </InputAdornment>
        ),
      }}
      {...inputProps}
      {...rest}
      fullWidth
    />
  );
};

PasswordInput.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func,
  value: PropTypes.func,
};

export default withStyles(styles)(PasswordInput);
