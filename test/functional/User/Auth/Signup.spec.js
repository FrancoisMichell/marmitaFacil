'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('FUNCTIONAL - User sign up')

trait('Test/ApiClient')
trait('DatabaseTransactions')

/* 
  - Deve criar conta com credenciais válidas
  - Deve falhar ao criar conta com username repetido
  - Deve falhar ao criar conta sem username
  - Deve falhar ao criar conta com email repetido
  - Deve falhar ao criar conta com email com formato inválido
  - Deve falhar ao criar conta sem email
  - Deve falhar ao criar conta sem confirmação de senha
  - Deve falhar ao criar conta com senha e confirmação diferentes
  - Deve falhar ao criar conta com senha pequena
  - Deve falhar ao criar conta sem senha
*/

test('It should sign up successfully', async ({ client }) => {
  const user = await Factory.get('user').make()
  const response = await client
    .post('/v1/user/auth')
    .send(user)
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({
    data: {
      user: {
        username: user.username,
        email: user.email
      }
    }
  })
})

test('It should fail to sign up with existing username', async ({ client }) => {
  const oldUser = await Factory.model('App/Models/User').create()
  const user = await Factory.get('user').make({ username: oldUser.username })
  const response = await client
    .post('/v1/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Nome inválido',
        field: 'username',
        code: 'UNIQUE'
      }
    ]
  })
})

test('It should fail to sign up without username', async ({ client }) => {
  const user = await Factory.get('user').make()
  user.username = ''
  const response = await client
    .post('/v1/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Nome é necessário para criar conta',
        field: 'username',
        code: 'REQUIRED'
      }
    ]
  })
})

test('It should fail to sign up with existing email', async ({ client }) => {
  const oldUser = await Factory.model('App/Models/User').create()
  const user = await Factory.get('user').make({ email: oldUser.email })

  const response = await client
    .post('/v1/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Email inválido',
        field: 'email',
        code: 'UNIQUE'
      }
    ]
  })
})

test('It should fail to sign up with invalid email', async ({ client }) => {
  const response = await client
    .post('/v1/user/auth')
    .send({ email: 'emailinvalido', password: 'PASSWORDINVALIDO' })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Email inválido',
        field: 'email',
        code: 'EMAIL'
      }
    ]
  })
})

test('It should fail to sign up without email', async ({ client }) => {
  const user = await Factory.get('user').make()
  user.email = ''
  const response = await client
    .post('/v1/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Email é necessário para criar conta',
        field: 'email',
        code: 'REQUIRED'
      }
    ]
  })
})

test('It should fail to sign up without password confirmation', async ({ client }) => {
  const user = await Factory.get('user').make()

  const response = await client
    .post('/v1/user/auth')
    .send({ ...user, password_confirmation: '' })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Senhas não combinam',
        field: 'password',
        code: 'CONFIRMED'
      }
    ]
  })
})

test('It should fail to sign up with wrong password confirmation', async ({ client }) => {
  const user = await Factory.get('user').make()
  const response = await client
    .post('/v1/user/auth')
    .send({ ...user, password_confirmation: 'confirmacao errada' })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Senhas não combinam',
        field: 'password',
        code: 'CONFIRMED'
      }
    ]
  })
})

test('It should fail to sign up with small password', async ({ client }) => {
  const user = await Factory.get('user').make()
  const response = await client
    .post('/v1/user/auth')
    .send({ ...user, password: '123', password_confirmation: '123' })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Senha deve conter no mínimo 4 caracteres',
        field: 'password',
        code: 'MIN'
      }
    ]
  })
})

test('It should fail to sign up without password', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .post('/v1/user/auth')
    .send({ email: user.email, password: '' })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Senha é necessária para criar conta',
        field: 'password',
        code: 'REQUIRED'
      }
    ]
  })
})
