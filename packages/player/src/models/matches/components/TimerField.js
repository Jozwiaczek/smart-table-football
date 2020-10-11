import React from 'react';
import { FunctionField } from 'react-admin';
import { models } from 'stf-core';

import { getTimerUnit } from '../../../utils/getTimerUnits';

const TimerField = ({ record, globalElapsedTimer, isInGame, ...rest }) => {
  if (isInGame === record.id) {
    return (
      <FunctionField
        {...rest}
        record={record}
        source={models.matches.fields.elapsedTime}
        render={() => {
          return `${getTimerUnit(globalElapsedTimer).min}:${getTimerUnit(globalElapsedTimer).sec}`;
        }}
      />
    );
  }
  return (
    <FunctionField
      {...rest}
      record={record}
      source={models.matches.fields.elapsedTime}
      render={(record) => {
        const elapsedTime = record[models.matches.fields.elapsedTime];
        return `${getTimerUnit(elapsedTime).min}:${getTimerUnit(elapsedTime).sec}`;
      }}
    />
  );
};

export default TimerField;
