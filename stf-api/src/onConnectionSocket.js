const {
  constants,
  models
} = require('stf-core')

// func name to change
const manageStatus = (app, socket, match) => {
  if (match[models.matches.fields.status] === constants.statusMatch.active) {
    socket.emit('startListening', match)
  } else {
    socket.emit('stopListening')
  }
}

const onPatchMatch = (app, socket, matches) => {
  matches.on('patched', match => {
    manageStatus(app, socket, match)
  })
}

const onCreateMatch = (app, socket, matches) => {
  matches.on('created', match => {
    manageStatus(app, socket, match)
  })
}

const onRemoveMatch = (app, socket, matches) => {
  matches.on('removed', match => {
    if (match[models.matches.fields.status] === constants.statusMatch.active) {
      socket.emit('stopListening')
    }
  })
}

const onCreateGoal = (app, socket, goals) => {
  goals.on('created', goal => {
    socket.emit('createdGoal', goal)
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
  const goals = app.service(constants.resources.goals)

  socket.on('goal', async data => {
    const { team, replayId, matchId } = data
    console.log(data)

    await app.service('goals').create({
      [models.goals.fields.match]: matchId,
      [models.goals.fields.team]: team,
      [models.goals.fields.replay]: replayId
    })
  })

  onCreateGoal(app, socket, goals)

  onPatchMatch(app, socket, matches)
  onCreateMatch(app, socket, matches)
  onRemoveMatch(app, socket, matches)

  onSocketDisconnect(app, socket)
}
