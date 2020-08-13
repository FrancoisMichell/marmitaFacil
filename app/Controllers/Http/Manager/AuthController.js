'use strict'

const Login = use('App/Mediators/Manager/Auth/Login')

class UserController {
  async login({ request, response }) {
    Login(request.all()).then(({ status, data }) => {
      return response.status(status).send(data)
    })
  }
}

module.exports = UserController
