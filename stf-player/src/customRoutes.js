import React from 'react'
import { Route } from 'react-router-dom'
import InGame from './routes/inGame'
import Registration from './routes/auth/registration/Registration'
import Verify from './routes/auth/verify'
import PasswordRecovery from './routes/auth/passwordRecovery/PasswordRecovery'
import PasswordReset from './routes/auth/passwordReset/PasswordReset'
import PasswordEmailSend from './routes/auth/passwordReset/PasswordEmailSend'
import Settings from './routes/settings'
import Notifications from './routes/notifications'

export default [
  <Route key={1} exact path='/registration' component={Registration} noLayout />,
  <Route key={2} exact path='/inGame' component={InGame} noLayout />,
  <Route key={3} exact path='/verify' component={Verify} noLayout />,
  <Route key={4} exact path='/passwordRecovery' component={PasswordRecovery} noLayout />,
  <Route key={5} exact path='/passwordReset' component={PasswordReset} noLayout />,
  <Route key={6} exact path='/passwordEmailSend' component={PasswordEmailSend} noLayout />,
  <Route key={7} exact path='/settings' component={Settings} />,
  <Route key={8} exact path='/notifications' component={Notifications} />
]
