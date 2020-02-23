import React from 'react'
import { Responsive } from 'react-admin'
import DashboardLayout from './DashboardLayout'

const Dashboard = (props) => (
  <Responsive
    small={
      <DashboardLayout small {...props} />
    }
    medium={
      <DashboardLayout {...props} />
    }
  />
)

export default Dashboard
