'use strict'

class Store {
  get validateAll() {
    return true
  }

  get data() {
    return this.ctx.request.only(['username', 'email', 'password', 'password_confirmation'])
  }

  get rules() {
    return {
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required|min:4|confirmed'
    }
  }

  get messages() {
    return {
      'username.required': 'Nome é necessário para criar conta',
      'username.unique': 'Nome inválido',

      'email.required': 'Email é necessário para criar conta',
      'email.email': 'Email inválido',
      'email.unique': 'Email inválido',

      'password.required': 'Senha é necessária para criar conta',
      'password.min': 'Senha deve conter no mínimo 4 caracteres',
      'password.confirmed': 'Senhas não combinam'
    }
  }

  async fails(errorMessages) {
    this.ctx.response.badRequest({ errors: errorMessages })
  }
}

module.exports = Store
