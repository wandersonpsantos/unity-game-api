'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Game extends Model {
  category() {
    return this.hasOne('App/Models/Category')
  }

  playerSetting() {
    return this.hasOne('App/Models/QuebraCabecaPlayerSetting')
  }
}

module.exports = Game
