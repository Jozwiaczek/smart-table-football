require('dotenv/config');
const { fork, execSync } = require('child_process');

const io = require('socket.io-client');
const { constants } = require('stf-core');

const { Logger } = require('./helpers/Logger');

const socket = io(process.env.API_URL);
const logger = new Logger(socket);
const tableStartupFilePath = '../table/src/index';
// const tableStartupFilePath = 'src/test'; // left for debugging
let forkedProcess;

logger.logSync('Table Manager Started');
socket.emit(constants.socketEvents.managerRunning);

socket.on(constants.socketEvents.isManagerRunning, () => {
  socket.emit(constants.socketEvents.managerRunning);
});

const startTable = () => {
  forkedProcess = fork(tableStartupFilePath, [], {
    stdio: 'pipe',
  });

  logger.logSync('Table turned ON');
  forkedProcess.stdout.on('data', function (data) {
    logger.logSync(data.toString(), false);
  });
};

const stopTable = () => {
  if (forkedProcess && forkedProcess.pid) {
    execSync(`kill ${forkedProcess.pid}`);
    forkedProcess = undefined;
    logger.logSync('Table turned OFF');
  } else {
    logger.logSync('No process PID');
  }
};

const updateTable = () => {
  const isRunning = forkedProcess && forkedProcess.pid;
  if (isRunning) {
    stopTable();
  }

  const pullResult = execSync('git pull');
  if (pullResult.toString().includes('Already up to date.')) {
    logger.logSync('System up to date.');
    socket.emit(constants.socketEvents.managerUpdated, 'up-to-date');
  } else {
    execSync('yarn install');
    logger.logSync('Table updated successfully');
    socket.emit(constants.socketEvents.managerUpdated, new Date());
  }

  if (isRunning) {
    startTable();
  }
};

socket.on(constants.socketEvents.manager, (data) => {
  switch (data) {
    case constants.managerActions.turnOn:
      startTable();
      break;
    case constants.managerActions.turnOff:
      stopTable();
      break;
    case constants.managerActions.update:
      updateTable();
      break;
    default:
      logger.logSync(`Error: No manager event='${data}'`);
  }
});
