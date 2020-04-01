import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import fscreen from 'fscreen'

export const FullScreen = ({ enabled, onChange, children }) => {
  const node = useRef(null)
  const className = ['fullscreen']
  if (enabled) {
    className.push('fullscreen-enabled')
  }

  const detectFullScreen = useCallback(() => {
    if (onChange) {
      onChange(fscreen.fullscreenElement === node.current)
    }
  }, [node, onChange])

  useEffect(() => handleProps())

  useEffect(() => {
    fscreen.addEventListener('fullscreenchange', detectFullScreen)
    return () => {
      fscreen.removeEventListener('fullscreenchange', detectFullScreen)
    }
  }, [detectFullScreen])

  const handleProps = () => {
    const isEnabled = fscreen.fullscreenElement === node.current
    if (isEnabled && !enabled) {
      leaveFullScreen()
    } else if (!isEnabled && enabled) {
      enterFullScreen()
    }
  }

  const enterFullScreen = () => {
    if (fscreen.fullscreenEnabled) {
      fscreen.requestFullscreen(node.current)
    }
  }

  const leaveFullScreen = () => {
    if (fscreen.fullscreenEnabled) {
      fscreen.exitFullscreen()
    }
  }

  return (
    <div
      className={className.join(' ')}
      ref={nodeRef => (node.current = nodeRef)}
      style={
        enabled ? { height: '100%', width: '100%', overflow: 'auto' } : undefined
      }
    >
      {children}
    </div>
  )
}

FullScreen.propTypes = {
  children: PropTypes.element.isRequired,
  enabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func
}

FullScreen.defaultProps = {
  enabled: false
}
