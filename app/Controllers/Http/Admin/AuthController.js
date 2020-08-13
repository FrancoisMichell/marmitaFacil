'use strict'

const { Login } = use('App/Mediators/Admin').Auth

class UserController {
  async login({ request, response }) {
    return Login(
      request.all().then(({ status, data }) => {
        response.status(status).send(data)
      })
    )
  }
}

module.exports = UserController
