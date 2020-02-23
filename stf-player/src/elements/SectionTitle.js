import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'

const SectionTitle = ({ title, loading, loadingColor }) => {
  if (loading) {
    return (
      <div style={{
        marginBottom: '1.5rem',
        marginTop: '3rem',
        height: '1.5rem',
        width: '10rem',
        background: loadingColor,
        borderRadius: '4px' }}
      />
    )
  }
  return (
    <Typography
      variant={'title'}
      style={{
        textAlign: 'center',
        marginBottom: '1rem',
        marginTop: '2rem'
      }}
    >
      {title}
    </Typography>
  )
}

SectionTitle.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  loadingColor: PropTypes.string
}

export default SectionTitle
