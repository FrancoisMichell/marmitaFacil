'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.createExtensionIfNotExists('uuid-ossp')
    this.create('users', (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'))
      table.string('name', 80).notNullable()
      table
        .string('cpf', 11)
        .notNullable()
        .unique()
        .index()
      table
        .string('email', 254)
        .notNullable()
        .unique()
        .index()
      table
        .enum('status', ['pending', 'active', 'blocked', 'deleted'])
        .defaultTo('pending')
        .notNullable()
        .index()
      table
        .string('reset_password_token')
        .unique()
        .index()
      table.datetime('reset_password_expiry')
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
