const mjml2html = require('mjml')

module.exports = function ({ verifyURL = '' }) {
  const {
    html,
    errors
  } = mjml2html(`
    <mjml>
      <mj-head>
        <mj-title>📧 Verify your email</mj-title>
      </mj-head>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text align="center" font-size="32px" color="#F57C00">
              Smart Table Football
            </mj-text>
            <mj-text font-size="20px" color="#626262" align="center">
              You need to verify your email.
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>

            <mj-text line-height="22px" align="center">
              To continue, please verify your email address by clicking the button below.
            </mj-text>

            <mj-button href="${verifyURL}">Verify Email</mj-button>

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
