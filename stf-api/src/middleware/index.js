module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  // // Create test mail
  // app.use('/test-mail', function (req, res) {
  //   console.log('/test-mail')
  //   app.service('mailer').create({
  //     to: 'kubencki@gmail.com',
  //     subject: '⚠️ Test middleware mail',
  //     html: '<p>Test mail html</p>'
  //   })
  // })

  // Create first admin
  app.use('/create-first-admin', function (req, res) {
    console.log('/create-first-admin')
    app.service('admins').create({
      email: 'test@test.com',
      password: '123123'
    })
  })
}
