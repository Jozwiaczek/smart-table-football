const { constants } = require('stf-core');

const onIsTableActive = (socket) => {
  socket.on(constants.socketEvents.isTableActiveRasp, () => {
    socket.emit(constants.socketEvents.tableActiveRasp);
  });
};

module.exports = onIsTableActive;
