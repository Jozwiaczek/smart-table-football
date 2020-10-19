import React from 'react';
import { Route } from 'react-router-dom';

import Game from './routes/game';
import Registration from './routes/auth/registration/Registration';
import Verify from './routes/auth/verify';
import PasswordRecovery from './routes/auth/passwordRecovery/PasswordRecovery';
import PasswordReset from './routes/auth/passwordReset/PasswordReset';
import PasswordEmailSend from './routes/auth/passwordReset/PasswordEmailSend';
import Settings from './routes/settings';
import Notifications from './routes/notifications';

export default [
  <Route exact noLayout key={1} path="/registration" component={Registration} />,
  <Route exact noLayout key={2} path="/game" component={Game} />,
  <Route exact noLayout key={3} path="/verify" component={Verify} />,
  <Route exact noLayout key={4} path="/passwordRecovery" component={PasswordRecovery} />,
  <Route exact noLayout key={5} path="/passwordReset" component={PasswordReset} />,
  <Route exact noLayout key={6} path="/passwordEmailSend" component={PasswordEmailSend} />,
  <Route exact key={7} path="/settings" component={Settings} />,
  <Route exact key={8} path="/notifications" component={Notifications} />,
];
