import React from 'react'
import { connect } from 'react-redux'
import {
  withDataProvider,
  Title,
  showNotification,
  GET_ONE,
  GET_LIST
} from 'react-admin'

import {
  Button,
  Typography
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import StatisticsIcon from '@material-ui/icons/BarChart'
import InviteFirendsIcon from '@material-ui/icons/GroupAdd'

import styled, { css } from 'styled-components'
import compose from 'recompose/compose'

import { constants, models } from '../../../../stf-core'
import Ball from '../../elements/Ball'
import BackgroundGraphic from '../../elements/BackgroundGraphic'
import { getPlayerId } from '../../utils/getPlayerId'
import CardStatistic from './CardStatistic'

const DashboardContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  flex-direction: ${props => props.small ? 'column' : 'row'};
  justify-content: center;
`

const DashboardSection = styled.div`
  margin-bottom: ${props => props.children ? '3rem' : 0};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${props => props.margin ? 'margin-bottom: 150px' : null};
`
const large = css`
  width: 100%;
  max-width: 30rem;
  margin-right: 2rem;
`
const DashboardFragment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${props => !props.small && large}
`

const DashboardLayout = ({ small, history, dataProvider }) => {
  const [player, setPlayer] = React.useState(null)
  const [teams, setTeams] = React.useState(null)
  const [matches, setMatches] = React.useState(null)
  const [goals, setGoals] = React.useState(null)

  React.useEffect(() => {
    const call = async () => {
      const resPlayer = await dataProvider(GET_ONE, constants.resources.players, { id: getPlayerId() }).then(res => res.data).catch(e => new Error(e))
      setPlayer(resPlayer)

      const resTeams = await dataProvider(GET_LIST, constants.resources.teams, {}).then(res => res.data).catch(e => new Error(e))
      const playersTeams = resTeams.filter(team => team[models.teams.fields.players].find(player => player === resPlayer._id))
      setTeams(playersTeams)

      const resMatches = await dataProvider(GET_LIST, constants.resources.matches, {}).then(res => res.data).catch(e => new Error(e))
      const playersMatches = resMatches.filter(match =>
        playersTeams.map(team =>
          match[models.matches.fields.teamA] === team._id || match[models.matches.fields.teamB] === team._id
        )
      )
      setMatches(playersMatches)

      const resGoals = await dataProvider(GET_LIST, constants.resources.goals, {}).then(res => res.data).catch(e => new Error(e))
      const playersGoals = resGoals.filter(goal => resTeams.map(team => goal[models.goals.fields.team] === team._id))
      setGoals(playersGoals)
    }
    call()
  }, [])

  if (!player || !goals) {
    return null
  }

  const wonMatches = matches.filter(match => teams.find(team => match[models.matches.fields.winner] === team._id))

  const getPlayerWinRatio = () => ((wonMatches.length / matches.length) * 100).toFixed(0)

  const getLastMatch = () => matches.reduce((m, v, i) => (v.createdAt > m.createdAt) && i ? v : m)

  return (
    <BackgroundGraphic
      graphic={<Ball />}
    >
      <DashboardContainer small={small}>

        <Title title='Dashboard' />

        <DashboardFragment small={small}>
          <DashboardSection>
            <Typography variant={'h3'} color={'textPrimary'} gutterBottom>
              Welcome {player[models.players.fields.firstName]}!
            </Typography>
          </DashboardSection>

          <DashboardSection>
            <Typography variant={'h5'} align={'center'} color={'textPrimary'} gutterBottom>
              If you want to play a game, click button below
            </Typography>
            <Button color={'primary'} variant={'contained'} onClick={() => history.push(`/${constants.resources.matches}/create`)}>
              <CreateIcon />
              Prepare match
            </Button>
          </DashboardSection>

          <DashboardSection>
            <Typography variant={'h4'} color={'textPrimary'} gutterBottom>
              Friends
            </Typography>
            <Typography variant={'body1'} color={'textPrimary'} gutterBottom>
              If you want invite friends, click button below
            </Typography>
            <Button color={'primary'} variant={'contained'} onClick={() => console.log('Invite friend btn clicked')}>
              <InviteFirendsIcon />&nbsp;
              Invite friend
            </Button>
          </DashboardSection>
        </DashboardFragment>

        <DashboardFragment small={small}>
          <DashboardSection>
            <Typography variant={'h4'} color={'textPrimary'} gutterBottom>
              Statistic
            </Typography>
            <Typography variant={'body1'} color={'textPrimary'} gutterBottom>
                Total goals: {goals.length}
            </Typography>
            {/* <CardStatistic title={'Test'} > */}
            {/*  Joloolol */}
            {/* </CardStatistic> */}
            <Typography variant={'body1'} color={'textPrimary'}>
              Win Ratio: {getPlayerWinRatio()}%
            </Typography>
            {/* <Typography variant={'body1'} color={'textPrimary'}> */}
            {/*  Current Winning Streak: 2 */}
            {/* </Typography> */}
            {/* <Typography variant={'body1'} color={'textPrimary'} gutterBottom> */}
            {/*  Longest Winning Streak: 3 */}
            {/* </Typography> */}
          </DashboardSection>

          <DashboardSection>
            <Typography variant={'h4'} color={'textPrimary'} gutterBottom>
              Last Match
            </Typography>
            <Typography variant={'body1'} align={'center'} color={'textPrimary'} gutterBottom>
              Click button below to show<br />
              statistic of your last match
            </Typography>
            <Button color={'primary'} variant={'outlined'} onClick={() => history.push(`/${constants.resources.matches}/${getLastMatch()._id}`)}>
              <StatisticsIcon />
              Show
            </Button>
          </DashboardSection>
        </DashboardFragment>
      </DashboardContainer>
    </BackgroundGraphic>
  )
}

const matchStateToProps = (state) => ({})

const enhance = compose(
  withDataProvider,
  connect(matchStateToProps, { showNotification })
)

export default enhance(DashboardLayout)
