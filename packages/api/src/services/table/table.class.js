const { Service } = require('feathers-memory');
const { models, constants } = require('stf-core');

exports.Table = class Table extends Service {
  setup(app) {
    this.app = app;
  }

  async getTable() {
    const table = await this.find();
    if (table && table.data.length > 0) {
      return table.data[0];
    }
  }

  async isActive() {
    const table = await this.getTable();
    if (table) {
      return table[models.table.fields.isActive];
    }
    return false;
  }

  async isInGame() {
    const table = await this.getTable();
    if (table && this.isActive()) {
      return table[models.table.fields.inGame];
    }
    return false;
  }

  async emitIsActive() {
    const isActive = await this.isActive();
    this.app.io.emit(constants.socketEvents.isTableActivePlayer, isActive);
  }

  async emitIsInGame() {
    const isInGame = await this.isInGame();
    this.app.io.emit(constants.socketEvents.isTableInGame, isInGame);
  }
};
