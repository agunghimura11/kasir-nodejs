import {
    Router
} from 'express';

import AuthController from './controllers/AuthController.js'
import KasirController from './controllers/KasirController.js';
import UserController from './controllers/UserController.js'

const routes = Router()

// User routes
routes.get('/user', UserController.getUser, AuthController.grantAccess('readOwn', 'userData'), UserController.getUser)

routes.post('/user/role', UserController.updateRole, AuthController.grantAccess('createAny', 'userData'), UserController.getUser)

routes.post('/user/update', UserController.updateUser, AuthController.grantAccess('createAny', 'userData'), UserController.getUser)

// Kasir routes
// Menambahkan uang pada proses Transaksi, hanya dapat dilakukan Kasir dan Manager dengan Access 'createOwn'
routes.post('/kasir/add', AuthController.AuthCheck, AuthController.grantAccess('createOwn','Transaksi'), KasirController.UangMasuk)

// Mengambil uang uang pada proses Transaksi, hanya dapat dilakukan Bos dengan Access 'createAny'
routes.post('/kasir/take', AuthController.AuthCheck, AuthController.grantAccess('createAny', 'Transaksi'), KasirController.UangKeluar)

// Menampilkan Laporan Transaksi, hanya dapat dilakukan Bos dengan Access 'readAny'
routes.get('/kasir/report', AuthController.AuthCheck, AuthController.grantAccess('readAny','Transaksi'), KasirController.Laporan)

export default routes