/* eslint-disable */
// const assert = require('assert')
// const app = require('../src/app')
// const { models, constants } = require('stf-core')


// describe('authentication', () => {
//   it('registered the authentication service', () => {
//     assert.ok(app.service('authentication'))
//   })
//
//   describe('local strategy', () => {
//     const userInfo = {
//       [models.players.fields.email]: 'someone@example.com',
//       [models.players.fields.password]: 'supersecret',
//       [models.players.fields.firstName]: 'Joe',
//       [models.players.fields.lastName]: 'Doe'
//     }
//
//     let playerId
//     before(async () => {
//       try {
//         playerId = await app.service('players').create(userInfo)
//       } catch (error) {
//         console.log('error', error)
//         // Do nothing, it just means the user already exists and can be tested
//       }
//     })
//
//     after(async () => {
//       try{
//         console.log(playerId)
//         await app.service('players').remove(playerId)
//       } catch (error) {
//         console.log('Error', error)
//       }
//     })
//
//     it('authenticates user and creates accessToken', async () => {
//       const { user, accessToken } = await app.service(constants.resources.playerAuthManagement).create({
//         strategy: 'local',
//         ...userInfo
//       })
//
//       console.log(accessToken)
//       console.log(user)
//
//       assert.ok(accessToken, 'Created access token for user')
//       assert.ok(user, 'Includes user in authentication data')
//     })
//   })
// })
