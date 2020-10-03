const fs = require('fs');

const { constants } = require('stf-core');

const { logSectionTitle, logCurrentDateWithMsg } = require('../helpers/logger');

const setupReplayDirectory = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    console.log('✔ Replays directory created');
    return;
  }

  console.log('Replays directory already exists');
};

const onInit = (socket, replayDirPath) => {
  logSectionTitle('Initialization');
  logCurrentDateWithMsg('Started at', true);
  console.log('✔ Connected');

  setupReplayDirectory(replayDirPath);

  socket.on(constants.socketEvents.isTableActiveRasp, () => {
    socket.emit(constants.socketEvents.tableActiveRasp);
  });
};

module.exports = onInit;
