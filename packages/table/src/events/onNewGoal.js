const { constants } = require('stf-core');

const { logDivider, logCurrentDateWithMsg } = require('../helpers/logger');
const { lightOn, lightOff } = require('../helpers/manageLights');
const { saveReplay, startVideoStream } = require('../services/CameraService');
const { GATE_A_LIGHT, GATE_B_LIGHT } = require('../GPIO');

const onNewGoal = async (type, socket, replayDirPath, match) => {
  const { teamA, teamB, replayTime, _id: matchId } = match;
  const isTeamA = type === 'A';
  const team = isTeamA ? teamA : teamB;
  const light = isTeamA ? GATE_A_LIGHT : GATE_B_LIGHT;

  logCurrentDateWithMsg(`🔴 Team ${type} scored a new goal`);
  lightOn(light);
  const replayId = await saveReplay(replayDirPath);
  socket.emit(constants.socketEvents.goal, { team, replayId, matchId });

  return new Promise((resolve) => {
    setTimeout(() => {
      startVideoStream(replayTime, replayDirPath);
      lightOff(light);
      logDivider();
      resolve(0);
    }, 1500);
  });
};

module.exports = onNewGoal;
