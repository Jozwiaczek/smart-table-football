import React from 'react';

import {
  DateField,
  TextInput,
  TextField,
  Edit,
  SelectInput,
  TopToolbar,
  ListButton,
  CloneButton,
  TabbedForm,
  FormTab,
  required,
  BooleanInput,
  DateTimeInput,
  ReferenceArrayField,
  ReferenceManyField,
  ChipField,
  SingleFieldList,
  Datagrid,
  useDataProvider,
  useNotify,
} from 'react-admin';

import { withStyles } from '@material-ui/core/styles';

import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Send from '@material-ui/icons/Send';

import { constants, models } from 'stf-core';

import { AvatarInput } from 'stf-ui-components';

import { getChoices } from '../../../enum';
import playerAuthManagementActionFactory from '../../../redux/actions/playerAuthManagement';
import ButtonInput from '../../../elements/ButtonInput';

const styles = {
  fullWidth: {
    width: '100%',
  },
};

const EditActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} />
    <CloneButton basePath={basePath} record={data} />
  </TopToolbar>
);

const PlayerEdit = ({ classes, ...rest }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  return (
    <Edit {...rest} actions={<EditActions />} undoable={false} title="Player Edit">
      <TabbedForm redirect={false} onSubmit={() => {}}>
        <FormTab label="summary">
          <TextField source="id" />
          <AvatarInput
            horizontal
            dataProvider={dataProvider}
            notify={notify}
            className={classes.avatarContainer}
            source={models.players.fields.avatar}
          />
          <TextInput source={models.players.fields.email} type="email" validate={required()} />
          <TextInput source={models.players.fields.firstName} validate={required()} />
          <TextInput source={models.players.fields.lastName} validate={required()} />
          <SelectInput
            source={models.players.fields.status}
            choices={getChoices(constants.statusEnum)}
          />
          <SelectInput
            label="Language"
            source={models.players.fields.locale}
            choices={getChoices(constants.locales)}
            validate={required()}
          />
          <DateField showTime source="createdAt" />
          <DateField showTime source="updatedAt" />
        </FormTab>

        <FormTab label="verify">
          <ButtonInput
            label="resources.users.actions.verifySignupLong.label"
            buttonLabel="resources.users.actions.verifySignupLong.buttonLabel"
            action={playerAuthManagementActionFactory('verifySignupLong', (id, data) => ({
              value: data[models.players.fields.verifyToken] || '',
            }))}
          >
            <VerifiedUser />
          </ButtonInput>
          <ButtonInput
            label="resources.users.actions.verifySignupShort.label"
            buttonLabel="resources.users.actions.verifySignupShort.buttonLabel"
            action={playerAuthManagementActionFactory('verifySignupShort', (id, data) => ({
              value: {
                user: {
                  email: data[models.players.fields.email],
                },
                token: data[models.players.fields.verifyShortToken] || '',
              },
            }))}
          >
            <VerifiedUser />
          </ButtonInput>
          <BooleanInput source={models.players.fields.isVerified} />
          <DateTimeInput source={models.players.fields.verifyExpires} />
        </FormTab>

        <FormTab label="password reset">
          <ButtonInput
            label="resources.users.actions.sendResetPwd.label"
            buttonLabel="resources.users.actions.sendResetPwd.buttonLabel"
            action={playerAuthManagementActionFactory('sendResetPwd', (id, data) => ({
              value: {
                email: data[models.players.fields.email],
              },
            }))}
          >
            <Send />
          </ButtonInput>
          <DateTimeInput source={models.players.fields.resetExpires} />
        </FormTab>

        <FormTab label="Teams">
          <ReferenceManyField
            addLabel={false}
            reference={constants.resources.teams}
            className={classes.fullWidth}
            sort={{
              field: 'createdAt',
              order: 'DESC',
            }}
          >
            <Datagrid rowClick="edit">
              <TextField source={models.teams.fields.name} />
              <ReferenceArrayField
                source={models.teams.fields.players}
                reference={constants.resources.players}
              >
                <SingleFieldList>
                  <ChipField source={models.players.fields.email} />
                </SingleFieldList>
              </ReferenceArrayField>

              <DateField source="createdAt" />
            </Datagrid>
          </ReferenceManyField>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
};

export default withStyles(styles)(PlayerEdit);
