import {
    Router
} from 'express';

import AuthController from './controllers/AuthController.js'

const routes = Router()

routes.post('/register', AuthController.register)
routes.post('/login', AuthController.login)


export default routes