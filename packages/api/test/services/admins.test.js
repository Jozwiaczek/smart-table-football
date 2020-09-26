const assert = require('assert');

const { constants } = require('stf-core');

const app = require('../../src/app');

describe("'admins' service", () => {
  it('registered the service', () => {
    const service = app.service(constants.resources.admins);

    assert.ok(service, 'Registered the service');
  });
});
