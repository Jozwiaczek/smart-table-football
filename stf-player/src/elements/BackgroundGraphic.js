import React from 'react'
import compose from 'recompose/compose'

import {
  Responsive
} from 'react-admin'

import {
  withStyles
} from '@material-ui/core'

const styles = {
  graphic: {
    left: '-5%',
    bottom: '-5%',
    position: 'fixed',
    height: '80vh',
    zIndex: 0,
    opacity: 0.03
  },
  children: {
    position: 'relative',
    zIndex: 10
  }
}

const BackgroundGraphic = ({ classes, children, graphic, className, ref }) => (
  <Responsive
    small={
      <>
        {children}
      </>
    }
    medium={
      <>
        {React.cloneElement(graphic, { className: classes.graphic, ref })}
        <div className={classes.children && className}>
          {children}
        </div>
      </>
    }
  />
)

const enhanced = compose(
  withStyles(styles)
)

export default enhanced(BackgroundGraphic)
