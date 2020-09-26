import React from 'react';
import PropTypes from 'prop-types';

import { TableCell } from '@material-ui/core';

const DateTableCell = ({ row }) => (
  <TableCell align="right">{new Date(row.createdAt).toLocaleString()}</TableCell>
);

DateTableCell.propTypes = {
  row: PropTypes.object,
};

export default DateTableCell;
