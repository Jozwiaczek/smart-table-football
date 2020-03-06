import React from 'react'
import { Route } from 'react-router-dom'
import InGame from './routes/inGame'
import Registration from './routes/auth/registration/Registration'
import Verify from './routes/auth/verify'
import PasswordRecovery from './routes/auth/passwordRecovery/PasswordRecovery'
import PasswordReset from './routes/auth/passwordReset/PasswordReset'
import PasswordEmailSend from './routes/auth/passwordReset/PasswordEmailSend'

export default [
  <Route exact path='/registration' component={Registration} noLayout />,
  <Route exact path='/inGame' component={InGame} noLayout />,
  <Route exact path='/verify' component={Verify} noLayout />,
  <Route exact path='/passwordRecovery' component={PasswordRecovery} noLayout />,
  <Route exact path='/passwordReset' component={PasswordReset} noLayout />,
  <Route exact path='/passwordEmailSend' component={PasswordEmailSend} noLayout />
]
