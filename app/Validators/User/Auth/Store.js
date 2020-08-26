'use strict'

class Store {
  get validateAll() {
    return true
  }

  get data() {
    return this.ctx.request.only(['name', 'email', 'cpf', 'password', 'password_confirmation'])
  }

  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users,email',
      cpf: 'required|min:11|max:11|unique:users,cpf',
      password: 'required|min:4|confirmed'
    }
  }

  get messages() {
    return {
      required: `{{field}} required`,
      unique: `Invalid {{field}}`,

      'email.email': 'Invalid email',

      'cpf.min': `{{field}} must have at least {{argument.0}} characters`,
      'cpf.max': `{{field}} must have at most {{argument.0}} characters`,

      'password.min': `{{field}} must have at least {{argument.0}} characters`,
      'password.confirmed': `{{field}} mismatch`
    }
  }

  async fails(errorMessages) {
    this.ctx.response.badRequest({ errors: errorMessages })
  }
}

module.exports = Store
