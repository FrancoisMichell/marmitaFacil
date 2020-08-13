'use strict'

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const fs = use('fs')
const path = use('path')
const Route = use('Route')

const routePath = path.join(__dirname, '../app/Routes')

fs.readdirSync(routePath).map((dir) =>
  fs.readdirSync(path.join(routePath, dir)).map((file) => require(path.join(routePath, dir, file)))
)

Route.any('/', ({ response }) => {
  return response.ok({ success: true, data: 'Welcome to adonis api boilerplate!' })
})

Route.any('*', ({ response }) => {
  return response.notFound({ code: 'NOT_FOUND' })
})
