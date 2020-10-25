const { Gpio } = require('onoff');

const TABLE_MANAGER_LIGHT = new Gpio(23, 'out');
const GATE_A_LIGHT = new Gpio(21, 'out');
const GATE_B_LIGHT = new Gpio(25, 'out');
const MATCH_LIGHT = new Gpio(15, 'out');
const TABLE_LIGHT = new Gpio(13, 'out');

module.exports = {
  TABLE_MANAGER_LIGHT,
  GATE_A_LIGHT,
  GATE_B_LIGHT,
  MATCH_LIGHT,
  TABLE_LIGHT,
};
