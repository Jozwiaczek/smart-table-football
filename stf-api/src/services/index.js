const players = require('./players/players.service.js')
const admins = require('./admins/admins.service.js')
const goals = require('./goals/goals.service.js')
const matches = require('./matches/matches.service.js')
const teams = require('./teams/teams.service.js')
const playerAuthManagement = require('./player-auth-management/player-auth-management.service.js')

const mailer = require('./mailer/mailer.service.js')

module.exports = function (app) {
  app.configure(players)
  app.configure(playerAuthManagement)
  app.configure(admins)
  app.configure(goals)
  app.configure(matches)
  app.configure(teams)
  app.configure(mailer)
}
