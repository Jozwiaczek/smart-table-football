const setupReplayDirectory = require('../helpers/setupReplayDirectory');
const { logSectionTitle, logCurrentDateWithMsg } = require('../helpers/logger');

const onInit = (socket, replayDirPath) => {
  logSectionTitle('Initialization');
  logCurrentDateWithMsg('Started at', true);

  setupReplayDirectory(replayDirPath);
};

module.exports = onInit;
