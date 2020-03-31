'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const User = use('App/Models/User')
const Transformer = use('App/Transformers/Admin/UserTransformer')

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param { Object } ctx.pagination
   */
  async index({ request, response, pagination, transform }) {
    const name = request.input('name')
    const query = User.query()
    if (name) {
      query.where('name', 'LIKE', `%${name}%`)
      query.orWhere('surname', 'LIKE', `%${name}%`)
      query.orWhere('email', 'LIKE', `%${name}%`)
    }
    const { page, limit } = pagination
    let users = await query.paginate(page, limit)
    users = await transform.paginate(users, Transformer)

    return response.send(users)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, transform }) {
    try {
      const userData = request.only([
        'name',
        'surname',
        'email',
        'password',
        'image_id'
      ])
      let user = await User.create(userData)
      user = await transform.item(user, Transformer)
      return response.status(201).send(user)
    } catch (error) {
      return response.status(400).send({ message: 'Bad Request' })
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, response, transform }) {
    let user = await User.findOrFail(id)
    user = await transform.item(user, Transformer)
    response.send(user)
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response, transform }) {
    let user = await User.findOrFail(id)
    const userData = request.only([
      'name',
      'surname',
      'email',
      'password',
      'image_id'
    ])
    user.merge(userData)
    await user.save()
    user = await transform.item(user, Transformer)
    return response.send(user)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, response }) {
    const user = await User.findOrFail(id)
    try {
      await user.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(500).send({ message: 'Internal Server Error' })
    }
  }
}

module.exports = UserController
