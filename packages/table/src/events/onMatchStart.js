const { constants } = require('stf-core');

const onNewGoal = require('./onNewGoal');
const { logSectionTitle, logCurrentDateWithMsg } = require('../helpers/logger');
const { lightOn } = require('../helpers/manageLights');
const { startVideoStream } = require('../services/CameraService');

const onMatchStart = (socket, replayDirPath, gpio) => {
  const { GREEN_LIGHT, GATE_A_SENSOR, RED_LIGHT } = gpio;

  const gateStopper = 0;
  socket.on(constants.socketEvents.startListening, async (match) => {
    logSectionTitle('Match started');
    logCurrentDateWithMsg('Started at', true);

    lightOn(GREEN_LIGHT);
    startVideoStream(match.replayTime, replayDirPath);
    GATE_A_SENSOR.watch(async (err, gateValue) => {
      if (err) {
        console.log('Error in onMatchStart -> GATE_A_SENSOR: ', err);
        return;
      }

      await onNewGoal(socket, replayDirPath, gateStopper, match, { RED_LIGHT, gateValue });
    });
  });
};

module.exports = onMatchStart;
