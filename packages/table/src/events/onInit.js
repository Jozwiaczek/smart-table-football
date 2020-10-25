const setupReplayDirectory = require('../helpers/setupReplayDirectory');
const { lightOn } = require('../helpers/manageLights');
const { logSectionTitle, logCurrentDateWithMsg } = require('../helpers/logger');
const { TABLE_LIGHT } = require('../GPIO');

const onInit = (socket, replayDirPath) => {
  logSectionTitle('🟢 Initialization');
  logCurrentDateWithMsg('Started at', true);
  lightOn(TABLE_LIGHT);

  setupReplayDirectory(replayDirPath);
};

module.exports = onInit;
