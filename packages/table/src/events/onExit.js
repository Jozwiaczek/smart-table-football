const { exec } = require('child_process');

const exitHook = require('exit-hook');

const { logSectionTitle, logCurrentDateWithMsg } = require('../helpers/logger');
const { lightOff } = require('../helpers/manageLights');

const onExit = (replayDirPath, gpio) => {
  const { RED_LIGHT, GREEN_LIGHT } = gpio;

  exitHook(() => {
    logSectionTitle('Cleanup');

    lightOff(RED_LIGHT);
    lightOff(GREEN_LIGHT);
    exec(`rm -rf ${replayDirPath}`);

    console.log('✔ Successful cleanup');
    logCurrentDateWithMsg('Exit at', true);
  });
};

module.exports = onExit;
