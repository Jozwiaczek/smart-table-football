/* eslint-disable */
const assert = require('assert');
const app = require('../../src/app');

describe("'table' service", () => {
  it('registered the service', () => {
    const service = app.service('table');

    assert.ok(service, 'Registered the service');
  });
});
