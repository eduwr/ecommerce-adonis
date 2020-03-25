'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Role = use('Role')

class AuthController {
  async register({ request, response }) {
    const trx = await Database.beginTransaction()
    try {
      const { name, surname, email, password } = request.all()

      const user = await User.create({ name, surname, email, password }, trx)
      const userRole = await Role.findBy('slug', 'client')
      await user.roles().attach([userRole.id], null, trx)
      await trx.commit()
      return response.status(201).send({ data: user })
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({
        message: "Couldn't register user!"
      })
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all()

    const data = await auth.withRefreshToken().attempt(email, password)

    return response.send({ data })
  }

  async refresh({ request, response, auth }) {
    let refreshToken = request.input('refresh_token')

    if (!refreshToken) {
      refreshToken = request.header('refresh_token')
    }

    const user = await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken)

    return response.status(200).send({ data: user })
  }

  async logout({ request, response, auth }) {
    let refreshToken = request.input('refresh_token')

    if (!refreshToken) {
      refreshToken = request.header('refresh_token')
    }

    await auth.authenticator('jwt').revokeTokens([refreshToken], true)

    return response.status(204).send({})
  }

  /*
  async forgot({ request, response }) {
    //
  }

  async remember({ request, response }) {
    //
  }

  async reset({ request, response }) {
    //
  }
  */
}

module.exports = AuthController
