require('dotenv/config');
const { fork, execSync, exec } = require('child_process');

const io = require('socket.io-client');
const exitHook = require('exit-hook');

const { constants } = require('stf-core');

const { lightOff } = require('./helpers/manageLights');

const { lightOn } = require('./helpers/manageLights');

const { Logger } = require('./helpers/Logger');

const socket = io(process.env.API_URL);
const logger = new Logger(socket);
const tableStartupFilePath = '../table/src/index';
const {
  TABLE_MANAGER_LIGHT,
  TABLE_LIGHT,
  MATCH_LIGHT,
  GATE_A_LIGHT,
  GATE_B_LIGHT,
} = require('./GPIO');
// const tableStartupFilePath = 'src/test'; // left for debugging
let forkedTableProcess;

lightOn(TABLE_MANAGER_LIGHT);

logger.logSync('⚪️ Table Manager Started');
socket.emit(constants.socketEvents.managerRunning, logger.allLogs);

socket.on(constants.socketEvents.isManagerRunning, () => {
  socket.emit(constants.socketEvents.managerRunning, logger.allLogs);
});

const startTable = () => {
  forkedTableProcess = fork(tableStartupFilePath, [], {
    stdio: 'pipe',
  });

  logger.logSync('Table turned ON');
  forkedTableProcess.stdout.on('data', function (data) {
    logger.logSync(data.toString(), false);
  });
};

const stopTable = () => {
  if (forkedTableProcess && forkedTableProcess.pid) {
    execSync(`kill ${forkedTableProcess.pid}`);
    forkedTableProcess = undefined;
    logger.logSync('Table turned OFF');
  } else {
    logger.logSync('No process PID');
  }
};

const updateTable = () => {
  const isTableRunning = forkedTableProcess && forkedTableProcess.pid;
  logger.logSync('System updating...');

  if (isTableRunning) {
    stopTable();
  }

  let pullResult;
  try {
    logger.logSync('git pull');
    pullResult = execSync('git pull');
    logger.logSync(pullResult);
  } catch (error) {
    try {
      logger.logSync(error);
      logger.logSync('git reset --hard');
      const gitResetResult = execSync('git reset --hard');
      logger.logSync(gitResetResult);

      logger.logSync('git pull');
      pullResult = execSync('git pull');
      logger.logSync(pullResult);
    } catch (error2) {
      logger.logSync(error2);
      return;
    }
  }

  if (pullResult && pullResult.toString().includes('Already up to date.')) {
    logger.logSync('System up to date.');
    socket.emit(constants.socketEvents.managerUpdated, 'up-to-date');
  } else {
    try {
      logger.logSync('yarn install');
      const yarnInstallResult = execSync('yarn install');
      logger.logSync(yarnInstallResult);
    } catch (error) {
      logger.logSync(error);
      socket.emit(constants.socketEvents.managerUpdated, 'Error: updating -> yarn install');
      return;
    }
    logger.logSync('Table updated successfully.');
    socket.emit(constants.socketEvents.managerUpdated, new Date());
  }

  if (isTableRunning) {
    startTable();
  }
};

const rebootManager = () => {
  logger.logSync('Table manager reboot');
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

exitHook(() => {
  lightOff(GATE_A_LIGHT);
  lightOff(GATE_B_LIGHT);
  lightOff(MATCH_LIGHT);
  lightOff(TABLE_LIGHT);
  lightOff(TABLE_MANAGER_LIGHT);
  logger.logSync('⚪️ Exit Table Manager');
});
