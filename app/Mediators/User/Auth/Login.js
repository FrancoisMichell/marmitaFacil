const Users = use('App/Models/User')
const BaseException = use('App/Exceptions/CustomException')
const responses = use('Adonis/Src/Config').get('httpResponses')

module.exports = ({ email, password }, auth) => {
  return auth
    .authenticator('user')
    .attempt(email, password)
    .then(async ({ token }) =>
      Users.findBy({ email }).then((user) => responses.ok({ user, token }))
    )
    .catch(() => {
      throw new BaseException('WRONG_CREDENTIALS')
    })
}
