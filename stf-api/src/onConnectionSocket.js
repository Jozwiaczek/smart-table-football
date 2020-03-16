const {
  constants,
  models
} = require('stf-core')

module.exports = function (app, socket) {
  socket.emit('isTableActive')

  socket.on('tableActive', () => {
    console.log('Table is active')
  })

  socket.on('goal', async data => {
    const { team, replayId, matchId } = data

    await app.service('goals').create({
      [models.goals.fields.match]: matchId,
      [models.goals.fields.team]: team,
      [models.goals.fields.replay]: replayId
    })
  })

  socket.on('disconnect', async () => {
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
