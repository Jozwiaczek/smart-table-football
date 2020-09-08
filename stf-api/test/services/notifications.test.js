/* eslint-disable */
const assert = require('assert');
const app = require('../../src/app');

describe("'Notifications' service", () => {
  it('registered the service', () => {
    const service = app.service('notifications');

    assert.ok(service, 'Registered the service');
  });
});
