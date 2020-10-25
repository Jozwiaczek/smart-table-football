const { Gpio } = require('onoff');

const GATE_A_LIGHT = new Gpio(21, 'out');
const GATE_B_LIGHT = new Gpio(25, 'out');
const MATCH_LIGHT = new Gpio(15, 'out');
const TABLE_LIGHT = new Gpio(13, 'out');
const GATE_A_SENSOR = new Gpio(2, 'in', 'both');
const GATE_B_SENSOR = new Gpio(14, 'in', 'both');

module.exports = {
  GATE_A_LIGHT,
  GATE_B_LIGHT,
  MATCH_LIGHT,
  TABLE_LIGHT,
  GATE_A_SENSOR,
  GATE_B_SENSOR,
};
