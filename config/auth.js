'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  authenticator: 'user',

  user: {
    serializer: 'lucid',
    model: 'App/Models/User',
    scheme: 'jwt',
    uid: 'email',
    password: 'password',
    options: {
      secret: `${Env.get('APP_KEY')}-USER-KEY`
    }
  },
  admin: {
    serializer: 'lucid',
    model: 'App/Models/Admin',
    scheme: 'jwt',
    uid: 'email',
    password: 'password',
    options: {
      secret: `${Env.get('APP_KEY')}ADMIN-KEY`
    }
  }
}
