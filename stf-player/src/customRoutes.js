import React from 'react'
import { Route } from 'react-router-dom'
import InGame from './routes/inGame'
import Registration from './routes/auth/registration/Registration'

export default [
  <Route exact path='/registration' component={Registration} noLayout />,
  <Route exact path='/inGame' component={InGame} noLayout />
]
