const assert = require('assert')
const app = require('../../src/app')

const {
  constants
} = require('@stf/stf-core')

describe('\'admins\' service', () => {
  it('registered the service', () => {
    const service = app.service(constants.resources.admins)

    assert.ok(service, 'Registered the service')
  })
})
