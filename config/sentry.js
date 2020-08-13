'use strict'

const Env = use('Env')

module.exports = {
  dsn: Env.get('SENTRY_DSN'),
  environment: Env.get('NODE_ENV')
}
