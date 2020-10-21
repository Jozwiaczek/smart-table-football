const { constants } = require('stf-core');

const maxNumberOfCharsInLine = 30;

exports.Logger = class Logger {
  constructor(socket) {
    this.socket = socket;
    this.logs = [];
    socket.on(constants.socketEvents.clearLogs, () => {
      this.logs = [];
    });
  }

  get allLogs() {
    return this.logs;
  }

  logSync(msg = '', withTimestamp = true) {
    const currentDate = new Date();
    const dateOpt = 'pl-PL';
    const date = currentDate.toLocaleDateString(dateOpt);
    const time = currentDate.toLocaleTimeString(dateOpt);
    const formattedMsg = withTimestamp ? `[${date} ${time}]: ${msg}` : msg;

    const logsCopy = [...this.logs, formattedMsg];
    this.logs = logsCopy.slice(Math.max(logsCopy.length - 20, 0));
    this.socket.emit(constants.socketEvents.managerLogs, this.logs);
    console.log(formattedMsg);
  }

  logSyncDivider() {
    const divider = '-'.repeat(maxNumberOfCharsInLine / 2);
    this.logSync(divider);
  }
};
