import Avatar from 'react-avatar-edit';
import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Button, makeStyles, Typography } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useDataProvider, useNotify } from 'ra-core';
import clsx from 'clsx';
import { constants, models } from 'stf-core';
import { UPDATE } from 'react-admin';

import { getPlayerId } from '../../utils/getPlayerId';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  verticalContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 190,
    alignItems: 'center',
    marginBottom: 10,
  },
  horizontalContainer: {
    display: 'flex',
    width: '100%',
    height: 190,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 10,
  },
  avatarPreview: {
    width: 150,
    height: 150,
  },
  avatarLabel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.hint,
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&[aria-disabled=true]': {
      color: theme.palette.text.disabled,
    },
  },
  labelIcon: {
    marginLeft: 10,
  },
  verticalButton: {
    maxHeight: 50,
    marginTop: 0,
  },
  horizontalButton: {
    maxHeight: 50,
    marginTop: 0,
    marginLeft: 20,
  },
}));

const AvatarInput = ({
  className = {},
  source,
  input,
  label,
  disabled,
  horizontal = false,
  record,
  ...rest
}) => {
  const classes = useStyles();
  const [preview, setPreview] = useState(null);
  const [isSelected, setSelected] = useState(false);
  const notify = useNotify();
  const dataProvider = useDataProvider();

  const theme = useTheme();

  useEffect(() => {
    if (!record || !record[models.players.fields.avatar]) return;

    setPreview(record[models.players.fields.avatar]);
    setSelected(true);
  }, [record[models.players.fields.avatar]]);

  useEffect(() => {
    if (input) {
      input.onChange(preview);
    }
  }, [isSelected]);

  const clickBtnAction = async () => {
    if (source && preview && !isSelected) {
      setSelected(true);
      try {
        await dataProvider(UPDATE, constants.resources.players, {
          id: getPlayerId(),
          data: {
            [source]: preview,
          },
        });
        notify('Avatar updated successfully', 'info');
      } catch (error) {
        notify(error, 'error');
      }
    } else if (source && preview && isSelected) {
      setPreview(null);
      setSelected(false);
      try {
        await dataProvider(UPDATE, constants.resources.players, {
          id: getPlayerId(),
          data: {
            [source]: null,
          },
        });
        notify('Avatar removed successfully', 'info');
      } catch (error) {
        notify(error, 'error');
      }
    } else {
      if (isSelected) {
        setPreview(undefined);
      }
      setSelected((prevState) => !prevState);
    }
  };

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const megaBytesToBytes = (megaBytes) => megaBytes * 1000000;

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > megaBytesToBytes(1)) {
      notify('File is too big. Max size is 1 MB (1000 KB)', 'warning');
      elem.target.value = '';
    }
  };

  const formattedLabel = useMemo(() => {
    if (label) return label;
    if (!source) return false;
    return source.charAt(0).toUpperCase() + source.slice(1);
  }, [label, source]);

  return (
    <div className={clsx(classes.container, className)} {...rest}>
      {formattedLabel && <Typography variant="subtitle1">{formattedLabel}</Typography>}
      <div
        className={horizontal ? classes.horizontalContainer : classes.verticalContainer}
        aria-hidden="true"
        onClick={(e) => {
          disabled && e.preventDefault();
        }}
      >
        {isSelected && <img alt="Avatar preview" className={classes.avatarPreview} src={preview} />}
        {!isSelected && (
          <Avatar
            value={preview}
            width={170}
            height={170}
            imageWidth={170}
            label={
              <span aria-disabled={disabled} className={classes.avatarLabel}>
                Upload avatar
                <CloudUploadIcon className={classes.labelIcon} />
              </span>
            }
            borderStyle={{
              borderRadius: 100,
              textAlign: 'center',
              border: `2px solid ${
                disabled ? theme.palette.text.disabled : theme.palette.text.primary
              }`,
            }}
            labelStyle={{
              fontSize: theme.typography.body2,
              fontWeight: theme.typography.fontWeightMedium,
              fontFamily: theme.typography.fontFamily,
              cursor: disabled ? 'no-drop' : 'pointer',
            }}
            cropColor={theme.palette.primary.main}
            closeIconColor={theme.palette.primary.main}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
          />
        )}
        {preview && (
          <Button
            className={horizontal ? classes.horizontalButton : classes.verticalButton}
            onClick={clickBtnAction}
          >
            {!isSelected ? 'Save' : <DeleteForeverIcon />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AvatarInput;
