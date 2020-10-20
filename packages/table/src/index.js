require('dotenv/config');
const path = require('path');

const io = require('socket.io-client');

const onInit = require('./events/onInit');
const onServerConnect = require('./events/onServerConnect');
const onExit = require('./events/onExit');
const gpio = require('./initGPIO');

const socket = io(process.env.API_URL);
const replayDirPath = path.join(__dirname, '/replays');

onInit(socket, replayDirPath);

onServerConnect(socket, replayDirPath, gpio);

onExit(replayDirPath, gpio);
