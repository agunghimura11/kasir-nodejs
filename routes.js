import {
    Router
} from 'express';

import AuthController from './controllers/AuthController.js'
import UserController from './controllers/UserController.js'

const routes = Router()

routes.get('/', AuthController.AuthCheck, AuthController.grantAccess('readAny', 'video'), UserController.getUser)

export default routes