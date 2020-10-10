import React, { useMemo } from 'react';
import { models } from 'stf-core';
import { Avatar } from '@material-ui/core';
import { ChipField } from 'react-admin';

const PlayerChipField = ({ record, ...rest }) => {
  const avatar = useMemo(() => {
    if (!record) return;

    if (record.avatar) {
      return <Avatar src={record.avatar} />;
    }

    const replacementAvatarString =
      record[models.players.fields.firstName].charAt(0) +
      record[models.players.fields.lastName].charAt(0);
    return <Avatar>{replacementAvatarString}</Avatar>;
  }, [record]);

  return (
    <ChipField source={models.players.fields.email} avatar={avatar} record={record} {...rest} />
  );
};

export default PlayerChipField;
