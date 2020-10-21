const { models, constants } = require('stf-core');

module.exports = function (app, socket, io) {
  const tableService = app.service(constants.resources.table);
  tableService.setup(app);

  socket.on(constants.socketEvents.clearLogs, () => {
    socket.broadcast.emit(constants.socketEvents.clearLogs);
  });

  socket.on(constants.socketEvents.manager, (data) => {
    socket.broadcast.emit(constants.socketEvents.manager, data);
  });

  socket.on(constants.socketEvents.managerLogs, (logs) => {
    socket.broadcast.emit(constants.socketEvents.managerLogs, logs);
  });

  socket.on(constants.socketEvents.managerUpdated, (status) => {
    socket.broadcast.emit(constants.socketEvents.managerUpdated, status);
  });

  socket.on(constants.socketEvents.isManagerRunning, () => {
    socket.broadcast.emit(constants.socketEvents.isManagerRunning);
  });

  socket.on(constants.socketEvents.managerRunning, (logs) => {
    socket.broadcast.emit(constants.socketEvents.managerRunning, logs);
  });

  socket.on(constants.socketEvents.currentStepTime, (currentStepTime) => {
    io.emit(constants.socketEvents.currentStepTime, currentStepTime);
  });

  socket.on(constants.socketEvents.isTableActivePlayer, async () => {
    await tableService.emitIsActive();
  });

  socket.on(constants.socketEvents.isTableInGame, async () => {
    await tableService.emitIsInGame();
  });

  socket.on(constants.socketEvents.tableActiveRasp, async () => {
    let tmp;
    try {
      tmp = await tableService.get(socket.id);
      // eslint-disable-next-line no-empty
    } catch (ignore) {}
    if (!tmp) {
      await tableService.create({
        [models.table.fields.id]: socket.id,
        [models.table.fields._id]: socket.id,
        [models.table.fields.isActive]: true,
      });
    }
  });

  socket.on(constants.socketEvents.goal, async (data) => {
    const { team, replayId, matchId } = data;

    await app.service(constants.resources.goals).create({
      [models.goals.fields.match]: matchId,
      [models.goals.fields.team]: team,
      [models.goals.fields.replay]: replayId,
    });
  });

  socket.on(constants.socketEvents.disconnect, async () => {
    const table = await tableService.getTable();
    if (table && socket.id === table[models.table.fields.id]) {
      tableService.remove(socket.id);
    }
  });

  socket.emit(constants.socketEvents.isTableActiveRasp);
};
