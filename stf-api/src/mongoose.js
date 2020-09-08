const mongoose = require('mongoose');

module.exports = function (app) {
  mongoose
    .connect(process.env.MONGOLAB_URI || app.get('mongodb'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.error(`DB Connection Error: ${err.message}`);
      process.exit(1);
    });

  const { connection } = mongoose;

  connection.on('connected', () => console.log('connected db'));

  connection.on('disconnected', () => console.log('disconnected db'));

  connection.on('error', () => console.log('db connection error'));

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
