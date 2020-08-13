'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Sentry = use('Sentry')
const Env = use('Env')

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { response }) {
    if (error.name === 'CustomException') return response.status(error.status).send(error.message)
    if (error.code === 'E_INVALID_JWT_TOKEN') {
      error.status = 403
      error.message = 'Malformed JWT'
    }
    return response.status(error.status || 500).send({
      code: 'SOMETHING_WENT_WRONG',
      message: error.message
    })
  }

  static captureError({ user }, request, error) {
    if (user) {
      Sentry.withScope((scope) => {
        scope.setUser({ ...user.attributes, ip: request.ip() })
        Sentry.captureException(error)
      })
    } else {
      Sentry.captureException(error)
    }
  }

  async report(error, { request, auth }) {
    if (Env.get('NODE_ENV') === 'production') this.constructor.captureError(auth, request, error)
  }
}

module.exports = ExceptionHandler
