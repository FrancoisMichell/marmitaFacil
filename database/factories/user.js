const Factory = use('Factory')

module.exports = [
  Factory.blueprint('user', (faker, i, data) => {
    return {
      name: faker.name(),
      email: faker.email(),
      cpf: faker.cpf().replace(/\D+/g, ''),
      password: 'Password1234',
      password_confirmation: 'Password1234',
      ...data
    }
  }),

  Factory.blueprint('App/Models/User', async (faker, i, data) => {
    return {
      name: faker.name(),
      email: faker.email(),
      cpf: faker.cpf().replace(/\D+/g, ''),
      password: 'Password1234',
      ...data
    }
  })
]
