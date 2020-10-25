const { constants } = require('stf-core');

const onNewGoal = require('./onNewGoal');
const { logSectionTitle, logCurrentDateWithMsg } = require('../helpers/logger');
const { lightOn } = require('../helpers/manageLights');
const { startVideoStream } = require('../services/CameraService');
const { MATCH_LIGHT, GATE_A_SENSOR, GATE_B_SENSOR } = require('../GPIO');

const onMatchStart = (socket, replayDirPath) => {
  let gateStopper = 0;
  socket.on(constants.socketEvents.startListening, async (match) => {
    logSectionTitle('🟡 Match started');
    logCurrentDateWithMsg('Started at', true);

    lightOn(MATCH_LIGHT);
    startVideoStream(match.replayTime, replayDirPath);
    GATE_A_SENSOR.watch(async (err, gateValue) => {
      if (err) {
        console.log('Error in onMatchStart -> GATE_A_SENSOR: ', err);
        return;
      }

      if (gateStopper === 0 && gateValue === 0) {
        gateStopper = 1;
        gateStopper = await onNewGoal('A', socket, replayDirPath, match);
      }
    });

    GATE_B_SENSOR.watch(async (err, gateValue) => {
      if (err) {
        console.log('Error in onMatchStart -> GATE_B_SENSOR: ', err);
        return;
      }

      if (gateStopper === 0 && gateValue === 0) {
        gateStopper = 1;
        gateStopper = await onNewGoal('B', socket, replayDirPath, match);
      }
    });
  });
};

module.exports = onMatchStart;
