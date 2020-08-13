'use strict'

const Env = use('Env')
const axios = use('axios').default
const Sentry = use('Sentry')

const Firebase = (exports = module.exports = {})

Firebase.push_notification = async (token, message) => {
  const data = {
    notification: {
      title: Env.get('APP_NAME'),
      body: message.body
    },
    data: message.data,
    to: token
  }
  axios
    .post('https://fcm.googleapis.com/fcm/send', data, {
      headers: {
        Authorization: `key=${Env.get('FIREBASE_KEY')}`,
        'Content-Type': 'application/json'
      }
    })
    .catch((error) => {
      Sentry.captureException(error)
    })
}
