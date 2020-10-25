const { constants } = require('stf-core');

const { logSectionTitle, logCurrentDateWithMsg } = require('../helpers/logger');
const { lightOff } = require('../helpers/manageLights');
const { stopAndRemoveVideoStream } = require('../services/CameraService');
const { MATCH_LIGHT, GATE_A_SENSOR, GATE_B_SENSOR } = require('../GPIO');

const onMatchStop = (socket, replayDirPath) => {
  socket.on(constants.socketEvents.stopListening, () => {
    logSectionTitle('🟡 Match stops');
    logCurrentDateWithMsg('Stopped at', true);

    stopAndRemoveVideoStream(replayDirPath);
    lightOff(MATCH_LIGHT);
    GATE_A_SENSOR.unwatch();
    GATE_B_SENSOR.unwatch();
  });
};

module.exports = onMatchStop;
