import React, { useRef } from 'react'
import compose from 'recompose/compose'

import { socket } from '../../client/feathersSocketClient'

import {
  withDataProvider,
  GET_ONE,
  GET_LIST,
  UPDATE,
  DELETE
} from 'react-admin'

import {
  Button,
  MuiThemeProvider,
  withStyles,
  Typography
} from '@material-ui/core'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import FullScreen from '../../elements/FullScreen'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { themeProvider } from '../../themes'

import {
  constants,
  models
} from '../../../../stf-core'

import Ball from '../../elements/Ball'
import BackgroundGraphic from '../../elements/BackgroundGraphic'
import GoalsList from './GoalsList'
import TeamCard from './TeamCard'
import NewGoalModal from './GoalDetailsModal'
import Timer from './Timer'

const styles = () => ({
  main: {
    minHeight: '100vh',
    overflow: 'auto'
  },
  controlsSection: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    margin: '2rem 0 0.5rem 0',
    width: '100%'
  },
  goalsList: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  title: {
    marginTop: '5vh'
  },
  gameControls: {
    marginTop: '10em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em'
  }
})

const changeStatus = async (match, dataProvider, status, setStatus, startTimer, stopTimer) => {
  if (status !== constants.statusMatch.active) {
    startTimer()
    await dataProvider(UPDATE, constants.resources.matches, {
      id: match.id,
      data: {
        [models.matches.fields.status]: constants.statusMatch.active
      }
    })
    setStatus(constants.statusMatch.active)
  } else {
    const elapsedTime = stopTimer()
    await dataProvider(UPDATE, constants.resources.matches, {
      id: match.id,
      data: {
        [models.matches.fields.status]: constants.statusMatch.paused,
        [models.matches.fields.elapsedTime]: elapsedTime
      }
    })
    setStatus(constants.statusMatch.paused)
  }
}

const finishMatch = async (match, history, dataProvider, stopTimer) => {
  const elapsedTime = stopTimer()
  await dataProvider(UPDATE, constants.resources.matches, {
    id: match.id,
    data: {
      [models.matches.fields.status]: constants.statusMatch.paused,
      [models.matches.fields.elapsedTime]: elapsedTime
    }
  })
  history.push(`/${constants.resources.matches}`)
}

const InGame = ({ history, classes, dataProvider }) => {
  const [theme, themeSetter] = React.useState(null)
  const [match, setMatch] = React.useState(null)
  const [status, setStatus] = React.useState(null)
  const [teamA, setTeamA] = React.useState(null)
  const [teamB, setTeamB] = React.useState(null)
  const [teamAGoals, setTeamAGoals] = React.useState([])
  const [teamBGoals, setTeamBGoals] = React.useState([])
  const [newGoal, setNewGoal] = React.useState(null)
  const [elapsedTimer, setElapsedTimer] = React.useState(0)
  const [isTimerRun, setIsTimerRun] = React.useState(false)
  const [isGoalModalOpen, setGoalModalOpen] = React.useState(false)
  const [completedCountdown, setCompletedCountdown] = React.useState(0)
  const [isFullScreen, setFullScreen] = React.useState(false)
  const countDownInterval = useRef()

  const openModalNewGoal = (instant) => {
    setGoalModalOpen(true)
    if (!instant) {
      countDownInterval.current = setInterval(() => {
        setCompletedCountdown(oldCompleted => {
          return oldCompleted + 1
        })
      }, 55)
    }
  }

  const closeModalNewGoal = () => {
    setGoalModalOpen(false)
    clearInterval(countDownInterval.current)
    setCompletedCountdown(0)
  }

  const startTimer = () => {
    setIsTimerRun(true)
  }

  const stopTimer = () => {
    setIsTimerRun(false)
    return elapsedTimer
  }

  React.useEffect(() => {
    let interval = null
    if (isTimerRun) {
      const start = Date.now() - elapsedTimer
      interval = setInterval(() => {
        setElapsedTimer(Date.now() - start)
      }, 100)
    } else if (!isTimerRun && elapsedTimer !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTimerRun, elapsedTimer])

  // const checkTableStatus = () => {
  //   socket.emit('checkTableStatus', matchId)
  //   socket.on('notAvailable', () => {
  //     console.log('not available')
  //   })
  // }

  const urlParams = new URLSearchParams(history.location.search)
  const matchId = urlParams.get('match')
  React.useEffect(() => {
    const call = async () => {
      try {
        // checkTableStatus()
        const theme = await themeProvider()
        await themeSetter(theme)
        const resMatch = await dataProvider(GET_ONE, constants.resources.matches, { id: matchId }).then(res => res.data)
        setMatch(resMatch)
        setElapsedTimer(resMatch[models.matches.fields.elapsedTime])
        setStatus(resMatch[models.matches.fields.status])
        const resTeamA = await dataProvider(GET_ONE, constants.resources.teams, { id: resMatch[models.matches.fields.teamA] }).then(res => res.data)
        setTeamA(resTeamA)
        const resTeamAGoals = await dataProvider(GET_LIST, constants.resources.goals, {
          filter: {
            [models.goals.fields.team]: resTeamA._id,
            [models.goals.fields.match]: resMatch._id
          }
        }).then(res => res.data)
        setTeamAGoals(resTeamAGoals)

        setTeamB(await dataProvider(GET_ONE, constants.resources.teams, { id: resMatch[models.matches.fields.teamB] }).then(res => res.data))
        socket.on('createdGoal', goal => {
          setNewGoal(goal)
          setTeamAGoals(teamAGoals => {
            teamAGoals[teamAGoals.length] = goal
            return teamAGoals
          })
          openModalNewGoal()
          setTimeout(() => { closeModalNewGoal() }, 6000)
        })
      } catch (e) {
        throw new Error(e)
      }
    }
    call()
  }, [])

  if (!theme || !teamA || !teamB) {
    return null
  }

  const getTeamName = teamId => {
    if (teamId === teamA._id) {
      return teamA[models.teams.fields.name]
    } else {
      return teamB[models.teams.fields.name]
    }
  }

  const removeGoal = async goal => {
    await dataProvider(DELETE, constants.resources.goals, { id: goal._id })
    if (goal[models.goals.fields.team] === teamA._id) {
      setTeamAGoals(teamGoals => teamGoals.filter(teamGoal => teamGoal !== goal))
    } else {
      setTeamBGoals(teamGoals => teamGoals.filter(teamGoal => teamGoal !== goal))
    }
  }

  const showGoalDetailsModal = (goal) => {
    setNewGoal(goal)
    openModalNewGoal(true)
  }

  return (
    <FullScreen
      enabled={isFullScreen}
      onChange={isFull => setFullScreen(isFull)}
    >
      <MuiThemeProvider theme={theme}>
        <div style={{ backgroundColor: theme.palette.background.default }}>
          <BackgroundGraphic
            graphic={<Ball />}
          >
            <div className={classes.navBar}>
              <Button color={'secondary'} onClick={() => finishMatch(match, history, dataProvider, stopTimer)}>
                <ArrowBackIcon style={{ fontSize: 60 }} />
              </Button>

              <Button color={'secondary'} onClick={() => setFullScreen(prevState => !prevState)}>
                {isFullScreen ? <FullscreenExitIcon style={{ fontSize: 60 }} /> : <FullscreenIcon style={{ fontSize: 60 }} />}
              </Button>
            </div>

            <div className={classes.main}>
              <Typography variant='h1' align='center' className={classes.title}>
                Match
              </Typography>

              <div className={classes.gameControls}>
                <TeamCard team={teamA} teamGoals={teamAGoals} theme={theme} />

                <div className={classes.controlsSection}>
                  <Timer time={elapsedTimer} />
                  <Button variant={'outlined'} color={'secondary'} onClick={() => changeStatus(match, dataProvider, status, setStatus, startTimer, stopTimer)}>
                    {status !== constants.statusMatch.active ? <><PlayArrowIcon />&nbsp;Start match</> : <><PauseIcon />&nbsp;Pause match</>}
                  </Button>
                  <Button variant={'contained'} color={'secondary'} onClick={() => finishMatch(match, history, dataProvider, stopTimer)}>
                    Finish match
                  </Button>
                </div>

                <TeamCard team={teamB} teamGoals={teamBGoals} theme={theme} />
              </div>
            </div>

            <Typography align={'center'} variant={'h3'}>Goals history</Typography>
            <div className={classes.goalsList}>
              <GoalsList title={'Team A'} getTeamName={getTeamName} goals={teamAGoals} removeGoal={removeGoal} onItemClick={showGoalDetailsModal} />
              <GoalsList title={'Team B'} getTeamName={getTeamName} goals={teamBGoals} removeGoal={removeGoal} onItemClick={showGoalDetailsModal} />
            </div>
          </BackgroundGraphic>
        </div>

        <NewGoalModal
          goal={newGoal}
          getTeamName={getTeamName}
          removeGoal={removeGoal}
          isAlertOpen={isGoalModalOpen}
          completedCountdown={completedCountdown}
          closeAlertNewGoal={closeModalNewGoal}
        />
      </MuiThemeProvider>
    </FullScreen>
  )
}

const enhance = compose(
  withStyles(styles),
  withDataProvider
)

export default enhance(InGame)
