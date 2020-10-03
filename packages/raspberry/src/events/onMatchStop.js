const { constants } = require('stf-core');

const { logSectionTitle, logCurrentDateWithMsg } = require('../helpers/logger');
const { lightOff } = require('../helpers/manageLights');
const { stopAndRemoveVideoStream } = require('../services/CameraService');

const onMatchStop = (socket, replayDirPath, gpio) => {
  const { GREEN_LIGHT, GATE_A_SENSOR } = gpio;

  socket.on(constants.socketEvents.stopListening, () => {
    logSectionTitle('Match stops');
    logCurrentDateWithMsg('Stopped at', true);

    stopAndRemoveVideoStream(replayDirPath);
    lightOff(GREEN_LIGHT);
    GATE_A_SENSOR.unwatch();
  });
};

module.exports = onMatchStop;
