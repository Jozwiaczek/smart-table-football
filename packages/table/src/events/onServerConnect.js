const { constants } = require('stf-core');

const onMatchStart = require('./onMatchStart');
const onMatchStop = require('./onMatchStop');
const onIsTableActive = require('./onIsTableActive');
const { logCurrentDateWithMsg } = require('../helpers/logger');

const onServerConnect = (socket, replayDirPath) => {
  socket.on(constants.socketEvents.connect, () => {
    logCurrentDateWithMsg('✔ Server connected');

    onIsTableActive(socket);

    onMatchStart(socket, replayDirPath);

    onMatchStop(socket, replayDirPath);
  });
};

module.exports = onServerConnect;
