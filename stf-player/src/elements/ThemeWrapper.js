/* global localStorage */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core'
import { setTheme } from '../redux/actions/theme'
import { constants } from 'stf-core'

const ThemeWrapper = ({ children }) => {
  const theme = useSelector(state => state.theme.currentTheme)
  const dispatch = useDispatch()

  useEffect(() => {
    let themeMode = localStorage.getItem(constants.themeMode.name)
    if (!themeMode) {
      themeMode = constants.themeMode.type.light
      localStorage.setItem(constants.themeMode.name, themeMode)
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
