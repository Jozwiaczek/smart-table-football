import React from 'react'
import { Route } from 'react-router-dom'
import InGame from './routes/inGame'
import Registration from './routes/auth/registration/Registration'
import Verify from './routes/auth/verify'
import PasswordRecovery from './routes/auth/passwordRecovery/PasswordRecovery'
import PasswordReset from './routes/auth/passwordReset/PasswordReset'
import PasswordEmailSend from './routes/auth/passwordReset/PasswordEmailSend'
import Settings from './routes/settings'

export default [
  <Route key={1} exact path='/registration' component={Registration} noLayout />,
  <Route key={2} exact path='/inGame' component={InGame} noLayout />,
  <Route exact path='/verify' component={Verify} noLayout />,
  <Route exact path='/password/edit' component={PasswordRecovery} noLayout />,
  <Route exact path='/passwordReset' component={PasswordReset} noLayout />,
  <Route exact path='/passwordEmailSend' component={PasswordEmailSend} noLayout />,
  <Route exact path='/settings' component={Settings} noLayout />
]
