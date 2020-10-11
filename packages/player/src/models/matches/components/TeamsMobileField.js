import React from 'react';
import { models } from 'stf-core';
import { Typography } from '@material-ui/core';

const TeamsMobileField = ({ teams, record }) => {
  if (!teams || !record) return null;
  const teamA = teams.find((team) => team._id === record[models.matches.fields.teamA]);
  const teamB = teams.find((team) => team._id === record[models.matches.fields.teamB]);
  return (
    <Typography>
      {teamA[models.teams.fields.name]} vs {teamB[models.teams.fields.name]}
    </Typography>
  );
};

export default TeamsMobileField;
