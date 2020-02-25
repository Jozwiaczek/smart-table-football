const {
  constants,
  models
} = require('stf-core')

const createMatch = (app, socket, match) => {
  if (match[models.matches.fields.status] === constants.statusMatch.active) {
    socket.emit('startListening', { [models.matches.fields.replayTime]: match[models.matches.fields.replayTime] })

    socket.on('goal', async data => {
      const { team, replayId } = data

      await app.service('goals').create({
        [models.goals.fields.match]: match._id,
        [models.goals.fields.team]: match[team],
        [models.goals.fields.replay]: replayId
      })
    })
  } else if (match[models.matches.fields.status] === constants.statusMatch.finished) {
    socket.emit('stopListening')
  } else if (match[models.matches.fields.status] === constants.statusMatch.paused) {
    socket.emit('stopListening')
  } else if (match[models.matches.fields.status] === constants.statusMatch.await) {
    socket.emit('stopListening')
  }
}

const onPatchMatch = (app, socket, matches) => {
  matches.on('patched', match => {
    createMatch(app, socket, match)
  })
}

const onCreateMatch = (app, socket, matches) => {
  matches.on('created', match => {
    createMatch(app, socket, match)
  })
}

const onRemoveMatch = (app, socket, matches) => {
  matches.on('removed', match => {
    if (match[models.matches.fields.status] === constants.statusMatch.active) {
      socket.emit('stopListening')
    }
  })
}

const onSocketDisconnect = (app, socket) => {
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

module.exports = function (app, socket) {
  const matches = app.service(constants.resources.matches)
  onSocketDisconnect(app, socket)
  onPatchMatch(app, socket, matches)
  onCreateMatch(app, socket, matches)
  onRemoveMatch(app, socket, matches)
}
