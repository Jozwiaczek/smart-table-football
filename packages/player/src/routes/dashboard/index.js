import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { GET_LIST, GET_ONE, Responsive, Title, useDataProvider, useTranslate } from 'react-admin';
import { Box, Button, Typography } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import StatisticsIcon from '@material-ui/icons/BarChart';
import styled, { css } from 'styled-components';
import { constants, models } from 'stf-core';
import moment from 'moment';
import lottie from 'lottie-web';
import { useTheme } from '@material-ui/core/styles';

import BackgroundGraphic from '../../elements/BackgroundGraphic';
import { getPlayerId } from '../../utils/getPlayerId';
import WinRatio from './statisticSection/WinRatio';
import GoalsNumber from './statisticSection/GoalsNumber';
import FriendsSection from './FriendsSection';
import WelcomeCard from './WelcomeCard';
import MatchesInWeek from './statisticSection/MatchesInWeek';
import LongestWinStreak from './statisticSection/LongestWinStreak';
import InstallPWAModal from '../../elements/InstallPWAModal';

const DashboardContainer = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  flex-direction: ${(props) => (props.small ? 'column' : 'row')};
  justify-content: center;
`;

const DashboardSection = styled.div`
  margin-bottom: ${({ children, noBottomMargin }) => (children && !noBottomMargin ? '3rem' : 0)};
  margin-top: 20px;
  width: 100%;
  display: flex;
  max-width: 400px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${(props) => (props.margin ? 'margin-bottom: 150px' : null)};
`;

const large = css`
  width: 100%;
  max-width: 40rem;
  margin-right: 2rem;
`;

const DashboardFragment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${(props) => !props.small && large}
`;

const SoccerPlayerAnimation = styled.div`
  width: 320px;
  height: 250px;
`;

const RootContainer = styled.div`
  padding: 0 30px;
`;

const DashboardLayout = ({ small, history, location }) => {
  const [player, setPlayer] = useState(null);
  const [teams, setTeams] = useState(null);
  const [matches, setMatches] = useState(null);
  const [goals, setGoals] = useState(null);
  const thisRef = useRef();
  const theme = useTheme();

  const translate = useTranslate();
  const dataProvider = useDataProvider();

  const isTableInGame = useSelector((state) => state.table.isInGame);

  useEffect(() => {
    if (thisRef.current) {
      const animate = lottie.loadAnimation({
        container: thisRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path:
          theme.palette.type === 'dark'
            ? './animations/dashboard/dark.json'
            : './animations/dashboard/light.json',
      });
      animate.setSpeed(1.5);
    }
    // eslint-disable-next-line
  }, [thisRef.current, location.pathname, theme.palette.type]);

  useEffect(() => {
    const call = async () => {
      try {
        const resPlayer = await dataProvider(GET_ONE, constants.resources.players, {
          id: getPlayerId(),
        }).then((res) => res.data);
        setPlayer(resPlayer);

        let resTeams;
        try {
          resTeams = await dataProvider(GET_LIST, constants.resources.teams, {
            filter: {},
          }).then((res) => res.data);
        } catch (error) {
          if (error.code === 400 || error.code === 401) {
            // TODO: Change location or add validator token checker
            await localStorage.removeItem(constants.storageKey);
            await window.location.replace('/login');
          }
        }

        if (Array.isArray(resTeams) && resTeams.length > 0) {
          const playersTeams = resTeams.filter((team) =>
            team[models.teams.fields.players].find((player) => player === getPlayerId()),
          );
          setTeams(playersTeams);

          const resMatches = (
            await dataProvider(GET_LIST, constants.resources.matches, {
              filter: {},
            })
          ).data;
          const playersMatches = resMatches.filter((match) =>
            playersTeams.find(
              (team) =>
                match[models.matches.fields.teamA] === team._id ||
                match[models.matches.fields.teamB] === team._id,
            ),
          );
          setMatches(playersMatches);

          const resGoals = await dataProvider(GET_LIST, constants.resources.goals, {
            filter: {},
          }).then((res) => res.data);
          const playersGoals = resGoals.filter((goal) =>
            playersTeams.find((team) => goal[models.goals.fields.team] === team._id),
          );
          setGoals(playersGoals);
        }
      } catch (e) {
        console.error(e);
      }
    };
    call();
  }, [dataProvider]);

  if (!player) {
    return null;
  }

  const wonMatches = () => {
    if (!matches || !teams) {
      return null;
    }
    return matches.filter((match) =>
      teams.find((team) => match[models.matches.fields.winner] === team._id),
    );
  };

  const getPlayerWinRatio = () => {
    const temp = wonMatches();
    if (!temp || !matches.length) {
      return 0;
    }

    return ((temp.length / matches.length) * 100).toFixed(0);
  };

  const getLastMatch = () => {
    if (!matches?.length) {
      return null;
    }
    return matches.reduce((m, v, i) => (v.createdAt > m.createdAt && i ? v : m));
  };

  const getMatchesNumberInLastWeek = () => {
    if (!matches?.length) {
      return 0;
    }

    const res = matches.filter((match) => {
      const start = moment().subtract(moment().isoWeekday() - 1, 'days');
      return start.isSameOrBefore(match.updatedAt);
    });

    return res.length ? res.length : 0;
  };

  const getLongestWinStreak = () => {
    if (!matches?.length) {
      return 0;
    }

    const sortedMatches = matches.sort((a, b) => a.updatedAt > b.updatedAt);
    const streaks = sortedMatches.reduce(
      (streak, currentMatch) => {
        const isWon = !!teams.find(({ _id }) => currentMatch[models.matches.fields.winner] === _id);
        if (isWon) {
          streak[streak.length - 1] = streak[streak.length - 1] + 1;
        } else {
          streak.push(0);
        }
        return streak;
      },
      [0],
    );

    return streaks?.length ? Math.max(...streaks) : 0;
  };

  const LastMatchField = () => {
    const lastMatch = getLastMatch();
    const translate = useTranslate();

    if (lastMatch) {
      return (
        <Box maxWidth="17em" display="flex" flexDirection="column" alignItems="center">
          <Typography gutterBottom variant="body1" align="center" color="textPrimary">
            {translate('pos.dashboard.lastMatchSection.body')}
          </Typography>
          <br />
          <Button
            color="primary"
            variant="outlined"
            onClick={() => history.push(`/${constants.resources.matches}/${lastMatch._id}`)}
          >
            <StatisticsIcon />
            {translate('pos.dashboard.lastMatchSection.button')}
          </Button>
        </Box>
      );
    }
    return (
      <Typography gutterBottom variant="body1" align="center" color="textPrimary">
        {translate('pos.dashboard.lastMatchSection.empty')}
      </Typography>
    );
  };

  const SectionTitle = ({ children }) => (
    <Typography variant="h4" component="h4" color="textPrimary" style={{ marginBottom: 20 }}>
      {children}
    </Typography>
  );

  return (
    <BackgroundGraphic>
      <RootContainer>
        <Title title={translate('pos.dashboard.title')} />

        <WelcomeCard />

        <DashboardContainer small={small}>
          <DashboardFragment small={small}>
            <DashboardSection noBottomMargin>
              <Typography variant="h3" color="textPrimary" align="center">
                {translate('pos.dashboard.welcomeTitle')} {player[models.players.fields.firstName]}!
              </Typography>
            </DashboardSection>

            <SoccerPlayerAnimation ref={thisRef} />

            <DashboardSection>
              {!isTableInGame && (
                <>
                  <SectionTitle>{translate('pos.dashboard.newMatchSection.title')}</SectionTitle>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h6"
                    align="center"
                    color="textPrimary"
                  >
                    {translate('pos.dashboard.newMatchSection.description')}
                  </Typography>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginTop: 16 }}
                    onClick={() => history.push(`/${constants.resources.matches}/create`)}
                  >
                    <CreateIcon />
                    {translate('pos.dashboard.newMatchSection.button')}
                  </Button>
                </>
              )}
            </DashboardSection>

            <DashboardSection>
              <SectionTitle>{translate('pos.dashboard.teamsSection.title')}</SectionTitle>
              <FriendsSection teamsNumber={teams?.length} />
            </DashboardSection>
          </DashboardFragment>

          <DashboardFragment small={small}>
            <DashboardSection>
              <SectionTitle>{translate('pos.dashboard.statisticSection.title')}</SectionTitle>
              <LongestWinStreak wins={getLongestWinStreak()} />
              <GoalsNumber goals={goals} />
              <WinRatio value={getPlayerWinRatio()} />
              <MatchesInWeek value={getMatchesNumberInLastWeek()} />
              <DashboardSection noBottomMargin>
                <SectionTitle>{translate('pos.dashboard.lastMatchSection.title')}</SectionTitle>
                <LastMatchField />
              </DashboardSection>
            </DashboardSection>
          </DashboardFragment>
        </DashboardContainer>
      </RootContainer>
      <InstallPWAModal />
    </BackgroundGraphic>
  );
};

const Dashboard = (props) => (
  <Responsive
    small={<DashboardLayout small {...props} />}
    medium={<DashboardLayout {...props} />}
  />
);

export default Dashboard;
