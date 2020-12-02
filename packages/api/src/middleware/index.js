module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
  //
  //
  // CREATE TEST MAIL
  // app.use('/test-mail', function (req, res) {
  //   console.log('/test-mail');
  //   app.service('mailer').create({
  //     to: 'xyz@gmail.com',
  //     subject: '⚠️ Test middleware mail',
  //     html: '<p>Test mail html</p>',
  //   });
  // });
  //
  //
  // CREATE FIRST ADMIN
  // app.use('/create-first-admin', function (req, res) {
  //   console.log('/create-first-admin');
  //   app.service('admins').create({
  //     email: 'admin@stf.com',
  //     password: '123123',
  //   });
  // });
};
