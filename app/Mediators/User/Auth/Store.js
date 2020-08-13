const Users = use('App/Models/User')
const BaseException = use('App/Exceptions/CustomException')
const responses = use('Adonis/Src/Config').get('httpResponses')

module.exports = ({ username, email, password }) => {
  return Users.create({ username, email, password })
    .then((user) => responses.created({ user }))
    .catch(() => {
      throw new BaseException('USER_SIGNUP_ERROR')
    })
}
