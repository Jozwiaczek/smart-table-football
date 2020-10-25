// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { constants, models } = require('stf-core');

// eslint-disable-next-line no-unused-vars
module.exports = () => {
  return async (context) => {
    const { app, result } = context;

    const matchId = context.data[models.goals.fields.match];
    const teamId = context.data[models.goals.fields.team];

    const currentMatch = await context.app.service(constants.resources.matches).get(matchId);

    const goalOwner =
      currentMatch[models.matches.fields.teamA].toString() === teamId.toString() ? 'A' : 'B';

    app.io.emit(constants.socketEvents.createdGoal, { goal: result, forTeam: goalOwner });

    return context;
  };
};
