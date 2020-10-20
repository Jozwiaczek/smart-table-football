import React from 'react';
import { Redirect } from 'react-router-dom';

const MailerList = ({ location }) => <Redirect to={`${location.pathname}/create`} />;

export default MailerList;
