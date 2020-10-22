require('dotenv/config');
const { fork, execSync, exec } = require('child_process');

const io = require('socket.io-client');
const { constants } = require('stf-core');

const { Logger } = require('./helpers/Logger');

const socket = io(process.env.API_URL);
const logger = new Logger(socket);
const tableStartupFilePath = '../table/src/index';
// const tableStartupFilePath = 'src/test'; // left for debugging
let forkedProcess;

logger.logSync('Table Manager Started');
socket.emit(constants.socketEvents.managerRunning, logger.allLogs);

socket.on(constants.socketEvents.isManagerRunning, () => {
  socket.emit(constants.socketEvents.managerRunning, logger.allLogs);
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
  logger.logSync('System updating...');
  if (isRunning) {
    stopTable();
  }

  execSync('nvm use 14');
  let pullResult;
  try {
    execSync('git reset --hard HEAD');
    pullResult = execSync('git pull');
  } catch (error) {
    logger.logSync(error);
    socket.emit(constants.socketEvents.managerUpdated, 'Error: updating -> git pull');
    return;
  }

  if (pullResult && pullResult.toString().includes('Already up to date.')) {
    logger.logSync('System up to date.');
    socket.emit(constants.socketEvents.managerUpdated, 'up-to-date');
  } else {
    try {
      execSync('yarn install');
    } catch (error) {
      logger.logSync(error);
      socket.emit(constants.socketEvents.managerUpdated, 'Error: updating -> yarn install');
      return;
    }
    logger.logSync('Table updated successfully.');
    socket.emit(constants.socketEvents.managerUpdated, new Date());
  }

  if (isRunning) {
    startTable();
  }
};

const rebootManager = () => {
  exec('reboot');
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
    case constants.managerActions.reboot:
      rebootManager();
      break;
    default:
      logger.logSync(`Error: No manager event='${data}'`);
  }
});
