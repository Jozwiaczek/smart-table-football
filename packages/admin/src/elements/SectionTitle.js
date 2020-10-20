import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const SectionTitle = ({ children, loading, loadingColor }) => {
  if (loading) {
    return (
      <div
        style={{
          marginBottom: '1.5rem',
          marginTop: '3rem',
          height: '1.5rem',
          width: '10rem',
          background: loadingColor,
          borderRadius: '4px',
        }}
      />
    );
  }
  return (
    <Typography
      variant="subtitle2"
      style={{
        marginBottom: 10,
        marginTop: 20,
      }}
    >
      {children}
    </Typography>
  );
};

SectionTitle.propTypes = {
  loading: PropTypes.bool,
  loadingColor: PropTypes.string,
};

export default SectionTitle;
