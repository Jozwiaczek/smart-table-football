import React from 'react';

import {
  Create,
  required,
  SimpleForm,
  TextInput,
  ReferenceInput,
  AutocompleteInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { models, constants } from 'stf-core';

const MailerCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput initialValue="no-reply@stf.io" source="from" type="email" />
      <ReferenceInput
        validate={required()}
        type="email"
        source="to"
        reference={constants.resources.players}
      >
        <AutocompleteInput optionText={models.players.fields.email} />
      </ReferenceInput>
      <TextInput source="subject" validate={required()} />
      <RichTextInput required source="html" label="Message" validate={required()} />
    </SimpleForm>
  </Create>
);

export default MailerCreate;
