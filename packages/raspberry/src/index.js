require('dotenv/config');
const Path = require('path');

const io = require('socket.io-client');
const { Gpio } = require('onoff');

const onMatchStart = require('./events/onMatchStart');
const onMatchStop = require('./events/onMatchStop');
const onInit = require('./events/onInit');
const onExit = require('./events/onExit');

const socket = io(process.env.API_URL);
const RED_LIGHT = new Gpio(21, 'out');
const GREEN_LIGHT = new Gpio(13, 'out');
const GATE_A_SENSOR = new Gpio(2, 'in', 'both');
const replayDir = Path.join(__dirname, '/replays');

socket.on('connect', () => {
  onInit(socket, replayDir);

  onMatchStart(socket, replayDir, { GREEN_LIGHT, GATE_A_SENSOR, RED_LIGHT });

  onMatchStop(socket, replayDir, { GREEN_LIGHT, GATE_A_SENSOR });

  onExit(replayDir, { RED_LIGHT, GREEN_LIGHT });
});
