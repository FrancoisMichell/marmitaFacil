'use strict'

const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('FUNCTIONAL - User sign up')

trait('Test/ApiClient')
trait('DatabaseTransactions')

/* 
  - Deve criar conta com credenciais válidas
  - Deve falhar ao criar conta com nome repetido
  - Deve falhar ao criar conta sem nome
  - Deve falhar ao criar conta com email repetido
  - Deve falhar ao criar conta com email com formato inválido
  - Deve falhar ao criar conta sem email
  - Deve falhar ao criar conta sem cpf
  - Deve falhar ao criar conta com cpf com mais de 11 dígitos
  - Deve falhar ao criar conta com cpf com menos de 11 dígitos
  - Deve falhar ao criar conta com cpf repetido
  - Deve falhar ao criar conta sem confirmação de senha
  - Deve falhar ao criar conta com senha e confirmação diferentes
  - Deve falhar ao criar conta com senha pequena
  - Deve falhar ao criar conta sem senha
*/

test('It should sign up successfully', async ({ client }) => {
  const user = await Factory.get('user').make()
  const response = await client
    .post('/user/auth')
    .send(user)
    .end()
  response.assertStatus(201)
  response.assertJSONSubset({
    data: {
      user: {
        name: user.name,
        email: user.email
      }
    }
  })
})

test('It should fail to sign up without name', async ({ client }) => {
  const user = await Factory.get('user').make({ name: '' })

  const response = await client
    .post('/user/auth')
    .send(user)
    .end()
  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'name required',
        field: 'name',
        code: 'REQUIRED'
      }
    ]
  })
})

test('It should fail to sign up with existing email', async ({ client }) => {
  const oldUser = await Factory.model('App/Models/User').create()
  const user = await Factory.get('user').make({ email: oldUser.email })

  const response = await client
    .post('/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Invalid email',
        field: 'email',
        code: 'UNIQUE'
      }
    ]
  })
})

test('It should fail to sign up with invalid email', async ({ client }) => {
  const user = await Factory.get('user').make({ email: 'emailinvalido' })

  const response = await client
    .post('/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Invalid email',
        field: 'email',
        code: 'EMAIL'
      }
    ]
  })
})

test('It should fail to sign up without email', async ({ client }) => {
  const user = await Factory.get('user').make({ email: `` })

  const response = await client
    .post('/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'email required',
        field: 'email',
        code: 'REQUIRED'
      }
    ]
  })
})

test('It should fail to sign up without cpf', async ({ client }) => {
  const user = await Factory.get('user').make({ cpf: '' })

  const response = await client
    .post('/user/auth')
    .send(user)
    .end()
  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'cpf required',
        field: 'cpf',
        code: 'REQUIRED'
      }
    ]
  })
})

test('It should fail to sign up with a cpf of >11 digits', async ({ client }) => {
  const user = await Factory.get('user').make({ cpf: '012345678901' })

  const response = await client
    .post('/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'cpf must have at most 11 characters',
        field: 'cpf',
        code: 'MAX'
      }
    ]
  })
})

test('It should fail to sign up with a cpf of <11 digits', async ({ client }) => {
  const user = await Factory.get('user').make({ cpf: '0123456789' })

  const response = await client
    .post('/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'cpf must have at least 11 characters',
        field: 'cpf',
        code: 'MIN'
      }
    ]
  })
})

test('It should fail to sign up with existing cpf', async ({ client }) => {
  const oldUser = await Factory.model('App/Models/User').create()
  const user = await Factory.get('user').make({ cpf: oldUser.cpf })

  const response = await client
    .post('/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'Invalid cpf',
        field: 'cpf',
        code: 'UNIQUE'
      }
    ]
  })
})

test('It should fail to sign up without password confirmation', async ({ client }) => {
  const user = await Factory.get('user').make({ password_confirmation: '' })

  const response = await client
    .post('/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'password mismatch',
        field: 'password',
        code: 'CONFIRMED'
      }
    ]
  })
})

test('It should fail to sign up with wrong password confirmation', async ({ client }) => {
  const user = await Factory.get('user').make({ password_confirmation: 'confirmacao errada' })
  const response = await client
    .post('/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'password mismatch',
        field: 'password',
        code: 'CONFIRMED'
      }
    ]
  })
})

test('It should fail to sign up with small password', async ({ client }) => {
  const user = await Factory.get('user').make({ password: '123', password_confirmation: '123' })
  const response = await client
    .post('/user/auth')
    .send(user)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'password must have at least 4 characters',
        field: 'password',
        code: 'MIN'
      }
    ]
  })
})

test('It should fail to sign up without password', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create()
  const response = await client
    .post('/user/auth')
    .send({ email: user.email, password: '' })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [
      {
        message: 'password required',
        field: 'password',
        code: 'REQUIRED'
      }
    ]
  })
})
