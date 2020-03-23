/* eslint-disable no-undef */
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  image() {
    return this.belongsTo('App/Models/Image')
  }

  products() {
    return this.belongsToMany('App/models/Product')
  }
}

module.exports = Category
