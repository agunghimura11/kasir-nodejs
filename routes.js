import {
    Router
} from 'express';

import AuthController from './controllers/AuthController.js'
import UserController from './controllers/UserController.js'

const routes = Router()

routes.post('/signup', AuthController.register)
routes.post('/login', AuthController.login)

routes.get('/', AuthController.AuthCheck, UserController.getUser)

export default routes