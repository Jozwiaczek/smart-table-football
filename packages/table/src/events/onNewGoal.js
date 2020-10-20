const { constants } = require('stf-core');

const { logDivider, logCurrentDateWithMsg } = require('../helpers/logger');
const { lightOn, lightOff } = require('../helpers/manageLights');
const { saveReplay, startVideoStream } = require('../services/CameraService');

const onNewGoal = async (socket, replayDirPath, gateStopper, match, gpio) => {
  const { teamA, replayTime, _id: matchId } = match;
  const { RED_LIGHT, gateValue } = gpio;

  if (gateStopper === 0 && gateValue === 0) {
    logCurrentDateWithMsg('⚽️ Team A scored a new goal');
    gateStopper = 1;
    lightOn(RED_LIGHT);
    const replayId = await saveReplay(replayDirPath);
    socket.emit(constants.socketEvents.goal, { team: teamA, replayId, matchId });

    await setTimeout(() => {
      startVideoStream(replayTime, replayDirPath);
      lightOff(RED_LIGHT);
      gateStopper = 0;
      logDivider();
    }, 1500);
  }
};

module.exports = onNewGoal;
