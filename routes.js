import {
    Router
} from 'express';

import AuthController from './controllers/AuthController.js'
import KasirController from './controllers/KasirController.js';
import UserController from './controllers/UserController.js'

const routes = Router()

// User routes
routes.get('/user', AuthController.AuthCheck, AuthController.grantAccess('readAny', 'video'), UserController.getUser)


// Kasir routes
routes.post('/kasir/add', AuthController.AuthCheck, AuthController.grantAccess('readAny', 'video'), KasirController.UangMasuk)
routes.post('/kasir/take', AuthController.AuthCheck, AuthController.grantAccess('readAny', 'video'), KasirController.UangKeluar)
routes.post('/kasir/report', AuthController.AuthCheck, AuthController.grantAccess('readAny', 'video'), KasirController.Laporan)

export default routes