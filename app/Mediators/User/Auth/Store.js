const Users = use('App/Models/User')
const BaseException = use('App/Exceptions/CustomException')
const responses = use('Adonis/Src/Config').get('httpResponses')

// eslint-disable-next-line camelcase
module.exports = ({ password_confirmation, ...data }) =>
  Users.create(data)
    .then((user) => responses.created({ user }))
    .catch(() => {
      throw new BaseException('USER_SIGNUP_ERROR')
    })
