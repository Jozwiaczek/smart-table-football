const { constants } = require('stf-core');
const nodemailer = require('nodemailer');

exports.Mailer = class Mailer {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    const mailerConfig = {
      ...this.app.get(constants.resources.mailer),
      Username: 'apikey',
      Password: process.env.MARILER_KEY,
      auth:
        process.env.NODE_ENV === 'development'
          ? this.app.get(constants.resources.mailer).auth
          : {
              user: 'apikey',
              pass: process.env.MARILER_KEY,
            },
    };

    const email = { ...data };

    // set default from
    if (!email.from) email.from = mailerConfig.from.name;

    const transporter = await nodemailer.createTransport(mailerConfig);

    const mailResponse = await transporter.sendMail(email);

    if (process.env.NODE_ENV === 'development') {
      console.log('Preview new mail URL: %s', nodemailer.getTestMessageUrl(mailResponse));
    }

    return mailResponse;
  }
};
