import React from 'react'

import { Create, required, SimpleForm, TextInput } from 'react-admin'

export const MailerCreate = (props) => (
  <Create
    {...props}
  >
    <SimpleForm>
      <TextInput source='from' type='email' validate={required()} />
      <TextInput source='to' type='email' validate={required()} />
      <TextInput source='subject' validate={required()} />
      <TextInput source='html' validate={required()} />
    </SimpleForm>
  </Create>
)
