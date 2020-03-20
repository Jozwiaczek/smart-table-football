const { models, constants } = require('stf-core')

module.exports = function (app, socket) {
  const tableService = app.service(constants.resources.table)
  tableService.setup(app)

  socket.on(constants.socketEvents.isTableActivePlayer, async () => {
    await tableService.emitIsActive()
  })

  socket.on(constants.socketEvents.tableActiveRasp, () => {
    tableService.create({
      [models.table.fields.id]: socket.id,
      [models.table.fields.isActive]: true
    })
  })

  socket.emit(constants.socketEvents.isTableActiveRasp)

  socket.on(constants.socketEvents.goal, async data => {
    const { team, replayId, matchId } = data

    await app.service(constants.resources.goals).create({
      [models.goals.fields.match]: matchId,
      [models.goals.fields.team]: team,
      [models.goals.fields.replay]: replayId
    })
  })

  socket.on(constants.socketEvents.disconnect, async () => {
    const table = await tableService.getTable()
    if (table && (socket.id === table[models.table.fields.id])) {
      tableService.remove(socket.id)
    }
  })
}
