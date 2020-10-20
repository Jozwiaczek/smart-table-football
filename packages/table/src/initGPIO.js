const { Gpio } = require('onoff');

const RED_LIGHT = new Gpio(21, 'out');
const GREEN_LIGHT = new Gpio(13, 'out');
const GATE_A_SENSOR = new Gpio(2, 'in', 'both');

module.exports = {
  RED_LIGHT,
  GREEN_LIGHT,
  GATE_A_SENSOR,
};
