/** @type {import('@adonisjs/lucid/src/Schema')} */
// eslint-disable-next-line no-undef
const Schema = use('Schema')

class CouponSchema extends Schema {
  up() {
    this.create('coupons', table => {
      table.increments()
      table.string('code', 100).notNullable()
      table.datetime('valid_from')
      table.datetime('valid_until')
      table.integer('quantity').defaultTo(10)
      table.enu('can_use_for', ['product', 'client', 'product_client', 'all'])

      table.enu('type', ['free', 'percent', 'currency']).defaultTo('currency')
      table.boolean('recursive').defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('coupons')
  }
}

module.exports = CouponSchema
