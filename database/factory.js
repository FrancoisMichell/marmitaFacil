'use strict'

/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const fs = use('fs')
const path = use('path')

fs.readdirSync(path.join(__dirname, '/factories')).forEach((file) => {
  require(path.join(__dirname, '/factories', file))
})
