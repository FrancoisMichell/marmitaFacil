const Route = use('Route')

const path = __filename.split('/')
const filename = path
  .pop()
  .slice(0, -3)
  .toLowerCase()
const namespace = path.pop()
const lowerNamespace = namespace.toLowerCase()

Route.group(() => {
  Route.post('/login', 'AuthController.login').validator('User/Auth/Login')
  Route.post('/', 'AuthController.store').validator('User/Auth/Store')
})
  .prefix(`/${lowerNamespace}/${filename}`)
  .namespace(namespace)
  .middleware('guest')
