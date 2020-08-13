'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const Sentry = require('@sentry/node')

class SentryProvider extends ServiceProvider {
  register() {
    this.app.singleton('Sentry', () => {
      const Config = this.app.use('Adonis/Src/Config')
      Sentry.init(Config.get('sentry'))
      return Sentry
    })
  }
}

module.exports = SentryProvider
