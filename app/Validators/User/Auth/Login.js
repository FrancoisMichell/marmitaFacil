'use strict'

class Login {
  get validateAll() {
    return true
  }

  get data() {
    return this.ctx.request.only(['email', 'password'])
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required|min:4'
    }
  }

  get messages() {
    return {
      'email.required': 'Email é necessário para logar',
      'email.email': 'Email inválido',
      'password.required': 'Senha é necessária para logar',
      'password.min': 'Senha inválida'
    }
  }

  async fails(errorMessages) {
    this.ctx.response.badRequest({ errors: errorMessages })
  }
}

module.exports = Login
