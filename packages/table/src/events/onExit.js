const { exec } = require('child_process');

const exitHook = require('exit-hook');

const { logSectionTitle, logCurrentDateWithMsg } = require('../helpers/logger');
const { lightOff } = require('../helpers/manageLights');
const {
  TABLE_LIGHT,
  MATCH_LIGHT,
  GATE_A_LIGHT,
  GATE_B_LIGHT,
  GATE_B_SENSOR,
  GATE_A_SENSOR,
} = require('../GPIO');

const onExit = (replayDirPath) => {
  exitHook(() => {
    logSectionTitle('Cleanup');

    lightOff(GATE_A_LIGHT);
    lightOff(GATE_B_LIGHT);
    lightOff(MATCH_LIGHT);
    lightOff(TABLE_LIGHT);

    GATE_A_SENSOR.unwatch();
    GATE_B_SENSOR.unwatch();

    exec(`rm -rf ${replayDirPath}`);

    console.log('✔ Successful cleanup');
    logCurrentDateWithMsg('🟢 Exit at', true);
  });
};

module.exports = onExit;
