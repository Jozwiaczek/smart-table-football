import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-admin';

import { Typography } from '@material-ui/core';

const Logo = ({ linkTo, className }) => {
  if (!linkTo) {
    return (
      <Typography variant="h2" align="center" className={className} color="textPrimary">
        Smart Table Football
      </Typography>
    );
  }

  return (
    <Link to={linkTo}>
      <Typography variant="h2" align="center" className={className} color="textPrimary">
        Smart Table Football
      </Typography>
    </Link>
  );
};

Logo.propTypes = {
  linkTo: PropTypes.string,
};

export default Logo;
