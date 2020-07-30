const { authenticate } = require('@feathersjs/authentication').hooks
const onboardTeam = require('./hooks/onboard-team')
const onAcceptTeamInvitation = require('./hooks/on-accept-team-invitation')
const onRejectTeamInvitation = require('./hooks/on-reject-team-invitation')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [onAcceptTeamInvitation()],
    patch: [onAcceptTeamInvitation()],
    remove: [onRejectTeamInvitation()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [onboardTeam()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
