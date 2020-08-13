'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('FUNCTIONAL - User login')

trait('Test/ApiClient')
trait('DatabaseTransactions')

/* 
  - Deve fazer login com sucesso com credenciais válidas
  - Deve falhar ao fazer login com email não existente
  - Deve falhar ao fazer login com email com formato inválido
  - Deve falhar ao fazer login sem email
  - Deve falhar ao fazer login com senha errada
  - Deve falhar ao fazer login com senha menor que o mínimo
  - Deve falhar ao fazer login sem senha 
*/

test('It should login successfully', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .post('/v1/user/auth/login')
    .send({ email: user.email, password: 'Password1234' })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    }
  })
})

test('It should fail to login with unexisting email', async ({ client }) => {
  const response = await client
    .post('/v1/user/auth/login')
    .send({ email: 'email@nao.existe', password: 'Password1234' })
    .end()
  response.assertStatus(401)
  response.assertJSONSubset({
    code: 'WRONG_CREDENTIALS',
    message: 'Credenciais inválidas'
  })
})

test('It should fail to login with invalid email', async ({ client }) => {
  const response = await client
    .post('/v1/user/auth/login')
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

test('It should fail to login without email', async ({ client }) => {
  const response = await client
    .post('/v1/user/auth/login')
    .send({ email: '', password: 'Password1234' })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Email é necessário para logar',
        field: 'email',
        code: 'REQUIRED'
      }
    ]
  })
})

test('It should fail to login with invalid password', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .post('/v1/user/auth/login')
    .send({ email: user.email, password: 'PASSWORDINVALIDO' })
    .end()

  response.assertStatus(401)
  response.assertJSONSubset({
    code: 'WRONG_CREDENTIALS',
    message: 'Credenciais inválidas'
  })
})

test('It should fail to login with short password', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .post('/v1/user/auth/login')
    .send({ email: user.email, password: '123' })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Senha inválida',
        field: 'password',
        code: 'MIN'
      }
    ]
  })
})

test('It should fail to login without password', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .post('/v1/user/auth/login')
    .send({ email: user.email, password: '' })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Senha é necessária para logar',
        field: 'password',
        code: 'REQUIRED'
      }
    ]
  })
})
