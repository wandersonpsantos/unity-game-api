'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  players() {
    return this.hasMany('App/Models/Player')
  }

  institution() {
    return this.belongsTo('App/Models/Institution')
  }

  themes() {
    return this.belongsToMany('App/Models/Theme').pivotTable('themes_users')
  }

  groups() {
    return this.belongsToMany('App/Models/Group').pivotTable('groups_players')
  }
}

module.exports = User
