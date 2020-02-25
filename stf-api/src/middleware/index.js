const { constants } = require('stf-core')

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  const makeTest = async () => {
    try {
      await app.service(constants.resources.goals).create({})
    } catch (e) {
      console.log(e)
    }
  }

  app.use('/test', async (req, res) => {
    console.log('test')
    // makeTest()
  })
}
