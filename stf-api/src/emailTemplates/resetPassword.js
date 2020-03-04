const mjml2html = require('mjml')

module.exports = function ({ resetURL = '' }) {
  const {
    html,
    errors
  } = mjml2html(`
    <mjml>
      <mj-head>
        <mj-title>🔑 Password reset</mj-title>
      </mj-head>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text align="center" font-size="32px" color="#F57C00">
              Smart Table Football
            </mj-text>
            <mj-text font-size="20px" color="#626262" align="center">
              Forgot you password?
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>

            <mj-text line-height="22px" align="center">
              Don't worry, it happens to the best of us. Let's get you a new password!
            </mj-text>

            <mj-text line-height="22px">
              If you didn't request a reset please ignore this email. Your password won't change unless you click the button below.
            </mj-text>

            <mj-button href="${resetURL}">Reset password</mj-button>

          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `, {})

  if (!html || errors.length) {
    errors.forEach(e => console.error(e))
    throw new Error('Failed to generate html.')
  }

  return html
}
