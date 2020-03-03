// Initializes the `playerAuthManagement` service on path `/player-auth-management`
const authManagement = require('feathers-authentication-management')
const resetPasswordEmail = require('../../emailTemplates/resetPassword')
const verifyEmail = require('../../emailTemplates/verifyEmail')

const hooks = require('./player-auth-management.hooks')

const config = require('config')

const {
  resources,
  playerRoutes
} = require('stf-core').constants

function notifier (app) {
  return async function (type, user) {
    switch (type) {
      case 'resendVerifySignup': {
        try {
          const verifyURL = `http://localhost:8081/#/verify?token=${user.verifyToken}`

          const emailTemplateParams = {
            verifyURL
          }

          const html = verifyEmail(emailTemplateParams)
          const subject = '📧 Verify your email'

          // if (user.status === 'pending') {
          //   html = verifyEmailAndWait(emailTemplateParams)
          //   subject = '📧 Verify your email and wait for approval'
          // }

          return app.service(resources.mailer).create({
            from: config.get('mailer.from.name'),
            to: user.email,
            subject: subject,
            html
          })
        } catch (e) {
          console.error(e)
          throw new Error('Failed to send password reset email.')
        }
      }
      // case 'verifySignupLong': {}
      case 'sendResetPwd': {
        try {
          const resetURL = `http://localhost:8081/#/${playerRoutes.passwordReset}?reset_token=${user.resetToken}`

          const html = resetPasswordEmail({ resetURL })

          return app.service(resources.mailer).create({
            from: config.get('mailer.from.name'),
            to: user.email,
            subject: '🔑 Password reset',
            html
          })
        } catch (e) {
          console.error(e)
          throw new Error('Failed to send password reset email.')
        }
      }
      // case 'resetPwd':
      // case 'passwordChange':
      // case 'identityChange':
      // default:
    }
  }
}

module.exports = function (app) {
  // Get our initialized service so that we can register hooks
  app.configure(authManagement({
    service: resources.players,
    path: resources.playerAuthManagement,
    notifier: notifier(app)
    // skipIsVerifiedCheck: true
  }))

  app.service(resources.playerAuthManagement).hooks(hooks)
}
