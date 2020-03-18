const {
  models
} = require('stf-core')

module.exports = function (app, socket) {
  const tableService = app.service('table')
  tableService.setup(app)

  socket.on('isTableActivePlayer', async () => {
    await tableService.emitIsActive()
  })

  socket.on('tableActiveRasp', () => {
    tableService.create({
      [models.table.fields.id]: socket.id,
      [models.table.fields.isActive]: true
    })
  })

  socket.emit('isTableActiveRasp')

  socket.on('goal', async data => {
    const { team, replayId, matchId } = data

    await app.service('goals').create({
      [models.goals.fields.match]: matchId,
      [models.goals.fields.team]: team,
      [models.goals.fields.replay]: replayId
    })
  })

  socket.on('disconnect', async () => {
    const table = await tableService.getTable()
    if (table && (socket.id === table[models.table.fields.id])) {
      tableService.remove(socket.id)
    }
  })
}
