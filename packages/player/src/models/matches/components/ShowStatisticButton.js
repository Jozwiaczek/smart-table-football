import React from 'react';
import { Button } from '@material-ui/core';
import { constants } from 'stf-core';
import AssessmentIcon from '@material-ui/icons/Assessment';

const ShowStatisticButton = ({ classes, record, history, mobile }) => {
  if (!record) return null;

  return (
    <Button
      color="primary"
      onClick={() => history.push(`/${constants.resources.matches}/${record._id}`)}
    >
      <AssessmentIcon className={classes.buttonIcon} />
      {mobile ? null : 'Statistic'}
    </Button>
  );
};

export default ShowStatisticButton;
