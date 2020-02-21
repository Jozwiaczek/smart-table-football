const assert = require('assert')
const app = require('../../src/app')

const {
  constants
} = require('@stf/stf-core')

describe('\'players\' service', () => {
  it('registered the service', () => {
    const service = app.service(constants.resources.players)

    assert.ok(service, 'Registered the service')
  })
})
