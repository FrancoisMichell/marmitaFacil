'use strict'

const Env = use('Env')

class Routelogger {
  async handle({ request }, next) {
    if (Env.get('NODE_ENV') === 'development') {
      this.logData(request)
    }
    await next()
  }

  logData(request) {
    // eslint-disable-next-line no-console
    console.log(
      `
        ------
        ${request.method()}: ${request.url()}
        REQUEST HEADERS: ${JSON.stringify(request.headers())}
  
        REQUEST PARAMS: ${JSON.stringify(
          Object.keys(request.get()).length ? request.get() : request.post()
        )}
        ------
      `
    )
  }
}

module.exports = Routelogger
