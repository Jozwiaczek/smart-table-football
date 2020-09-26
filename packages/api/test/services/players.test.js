const assert = require('assert');

const { constants } = require('stf-core');

const app = require('../../src/app');

describe("'players' service", () => {
  it('registered the service', () => {
    const service = app.service(constants.resources.players);

    assert.ok(service, 'Registered the service');
  });
});
