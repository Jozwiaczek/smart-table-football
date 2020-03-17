const {
  constants,
  models
} = require('stf-core')

module.exports = function (app, socket) {
  socket.on('isTableActivePlayer', () => {
    socket.emit('isTableActivePlayer', global['isTableActive'])
  })

  socket.on('tableActiveRasp', () => {
    global['tableId'] = socket.id
    global['isTableActive'] = true
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
    if (socket.id === global['tableId']) {
      global['isTableActive'] = false
    }
    const activeMatches = await app.service(constants.resources.matches).find({
      query: {
        [models.matches.fields.status]: constants.statusMatch.active
      }
    })

    activeMatches.data.map(async activeMatch => app.service(constants.resources.matches).patch(activeMatch._id, {
      [models.matches.fields.status]: constants.statusMatch.paused
    }))
  })
}
