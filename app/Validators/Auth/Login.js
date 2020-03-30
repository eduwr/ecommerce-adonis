'use strict'

class Login {
  get rules() {
    return {
      // validation rules
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'O e-mail é obrigatório!',
      'email.email': 'O e-mail não é válido',
      'password.required': 'A senha é obrigatória!'
    }
  }
}

module.exports = Login
