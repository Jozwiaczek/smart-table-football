import React from 'react'
import { Route } from 'react-router-dom'
import InGame from './routes/inGame'
import Registration from './routes/auth/registration/Registration'

export default [
  <Route key={1} exact path='/registration' component={Registration} noLayout />,
  <Route key={2} exact path='/inGame' component={InGame} noLayout />
]
