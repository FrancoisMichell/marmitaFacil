'use strict'

const Env = use('Env')

module.exports = {
  connection: Env.get('DATABASE_CONNECTION', 'pg'),
  pg: {
    client: 'pg',
    connection: Env.get('DATABASE_URL'),
    debug: Env.get('DATABASE_DEBUG', false) === 'true'
  }
}
