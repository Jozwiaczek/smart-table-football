import React from 'react'
import { Layout, Sidebar } from 'react-admin'
import AppBar from './AppBar'
import { useSelector } from 'react-redux'
import Menu from './Menu'

const CustomSidebar = (props) => <Sidebar {...props} size={200} />

export default (props) => {
  const theme = useSelector(state => state.theme.currentTheme)

  return (
    <Layout
      {...props}
      appBar={AppBar}
      sidebar={CustomSidebar}
      theme={theme}
      menu={Menu}
    />
  )
}
