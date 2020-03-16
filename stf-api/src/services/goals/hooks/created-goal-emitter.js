// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = () => {
  return async context => {
    const { app, result } = context

    app.io.emit('createdGoal', result)

    return context
  }
}
