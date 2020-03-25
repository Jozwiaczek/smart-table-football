import React, { useState } from 'react'
import PropTypes from 'prop-types'
import BackgroundGraphic from '../../elements/BackgroundGraphic'
import GameBar from './GameBar'
import { FullScreen } from '../../elements/FullScreen'
import ThemeWrapper from '../../elements/ThemeWrapper'

const LayoutWrapper = ({ children, finishMatch }) => {
  const [isFullScreen, setFullScreen] = useState(false)

  return (
    <ThemeWrapper>
      <FullScreen
        enabled={isFullScreen}
        onChange={isFull => setFullScreen(isFull)}
      >
        <BackgroundGraphic>
          <GameBar
            finishMatch={finishMatch}
            isFullScreen={isFullScreen}
            setFullScreen={setFullScreen}
          />
          {children}
        </BackgroundGraphic>
      </FullScreen>
    </ThemeWrapper>
  )
}

LayoutWrapper.propTypes = {
  children: PropTypes.array.isRequired,
  finishMatch: PropTypes.func.isRequired
}

export default LayoutWrapper
