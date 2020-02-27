import { after, before, describe, it } from 'mocha'

const assert = require('assert')
const axios = require('axios')
const url = require('url')
const app = require('../src/app')

const hostname = app.get('host') || 'localhost'
const port = app.get('port') || 8998
const getUrl = pathname => url.format({
  protocol: 'http',
  hostname,
  port,
  pathname
})

describe('Feathers application tests', () => {
  let server

  before(function (done) {
    server = app.listen(port, hostname)
    server.once('listening', () => done())
  })

  after(function (done) {
    server.close(done)
  })

  it('starts and shows the index page', async () => {
    const { data } = await axios.get(getUrl())

    assert.ok(data.indexOf('<html lang="en">') !== -1)
  })

  describe('404', function () {
    it('shows a 404 HTML page', async () => {
      try {
        await axios.get(getUrl('path/to/nowhere'), {
          headers: {
            Accept: 'text/html'
          }
        })
        assert.fail('should never get here')
      } catch (error) {
        const { response } = error

        assert.strictEqual(response.status, 404)
        assert.ok(response.data.indexOf('<html lang="en">') !== -1)
      }
    })

    it('shows a 404 JSON error without stack trace', async () => {
      try {
        await axios.get(getUrl('path/to/nowhere'), {
          json: true
        })
        assert.fail('should never get here')
      } catch (error) {
        const { response } = error

        assert.strictEqual(response.status, 404)
        assert.strictEqual(response.data.code, 404)
        assert.strictEqual(response.data.message, 'Page not found')
        assert.strictEqual(response.data.name, 'NotFound')
      }
    })
  })
})
