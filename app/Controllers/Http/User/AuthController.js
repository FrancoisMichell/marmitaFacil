'use strict'

const mediator = use('App/Mediators/User/Auth')

class UserController {
  async store({ request, response }) {
    return mediator.Store(request.all()).then(({ status, data }) => {
      response.status(status).send(data)
    })
  }

  async login({ request, response, auth }) {
    return mediator.Login(request.only(['email', 'password']), auth).then(({ status, data }) => {
      response.status(status).send(data)
    })
  }
}

module.exports = UserController
