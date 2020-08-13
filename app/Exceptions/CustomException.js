'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const ErrorList = use('Adonis/Src/Config').get('errors')

class CustomException extends LogicalException {
  constructor(code) {
    const { status, message } = ErrorList[`${code}`]
    super({ message, code }, status)
  }
}

module.exports = CustomException
