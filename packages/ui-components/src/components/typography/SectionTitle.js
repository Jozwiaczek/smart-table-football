import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

export const SectionTitle = ({ children, loading = false, loadingColor = '#e0e0e0' }) => {
  if (loading) {
    return (
      <div
        style={{
          marginBottom: '1rem',
          marginTop: '1rem',
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
      variant="subtitle1"
      style={{
        marginBottom: '1rem',
        marginTop: '1rem',
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
