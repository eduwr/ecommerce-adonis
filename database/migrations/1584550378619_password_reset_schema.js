/** @type {import('@adonisjs/lucid/src/Schema')} */
// eslint-disable-next-line no-undef
const Schema = use('Schema')

class PasswordResetSchema extends Schema {
  up() {
    this.create('password_reset', table => {
      table.increments()
      table.string('email', 254).notNullable()
      table
        .string('token')
        .notNullable()
        .unique()
      table.datetime('expires_at')
      table.timestamps()

      table
        .foreign('email')
        .references('email')
        .inTable('users')
        .onDelete('cascade')
    })
  }

  down() {
    this.drop('password_reset')
  }
}

module.exports = PasswordResetSchema
