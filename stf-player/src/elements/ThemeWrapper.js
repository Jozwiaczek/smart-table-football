/* global localStorage */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core'
import { setTheme } from '../redux/actions/theme'

const ThemeWrapper = ({ children }) => {
  const theme = useSelector(state => state.theme.currentTheme)
  const dispatch = useDispatch()
  console.log('L:11 | theme: ', theme)

  useEffect(() => {
    let themeMode = localStorage.getItem('themeMode')
    if (!themeMode) {
      localStorage.setItem('themeMode', 'light')
      themeMode = 'light'
    }
    dispatch(setTheme(themeMode))
  }, [dispatch])
  return (
    <MuiThemeProvider theme={theme} >
      {children}
    </MuiThemeProvider>
  )
}

ThemeWrapper.propTypes = {
  children: PropTypes.array.isRequired
}

export default ThemeWrapper
