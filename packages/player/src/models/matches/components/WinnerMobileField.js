import React from 'react';
import { models } from 'stf-core';
import { Typography } from '@material-ui/core';

const WinnerMobileField = ({ teams, record }) => {
  if (!teams || !record || !record[models.matches.fields.winner]) return null;
  const winner = teams.find((team) => team._id === record[models.matches.fields.winner]);
  return <Typography>Winner: {winner[models.teams.fields.name]}</Typography>;
};

export default WinnerMobileField;
