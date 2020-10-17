import {
    Router
} from 'express';

import AuthController from './controllers/AuthController.js'
import KasirController from './controllers/KasirController.js';
import UserController from './controllers/UserController.js'

const routes = Router()

// User routes
// Get all user
routes.get('/user', AuthController.AuthCheck, AuthController.grantAccess('readAny', 'userData'), UserController.getUser)
// Update role (bos manager)
routes.put('/user/role', AuthController.AuthCheck, AuthController.grantAccess('createAny', 'userData'), UserController.updateRole)
// Update User (bos dan manager)
routes.put('/user/update', AuthController.AuthCheck, AuthController.grantAccess('createAny', 'userData'), UserController.updateUser)
// Delete User (bos dan manager)
routes.post('/user/delete', AuthController.AuthCheck, AuthController.grantAccess('createAny', 'userData'), UserController.deleteUser)

// Kasir routes
// Menambahkan uang pada proses Transaksi, hanya dapat dilakukan Kasir dan Manager dengan Access 'createOwn'
routes.post('/kasir/add', AuthController.AuthCheck, AuthController.grantAccess('createOwn','Transaksi'), KasirController.UangMasuk)

// Mengambil uang uang pada proses Transaksi, hanya dapat dilakukan Bos dengan Access 'createAny'
routes.post('/kasir/take', AuthController.AuthCheck, AuthController.grantAccess('createAny', 'Transaksi'), KasirController.UangKeluar)

// Menampilkan Laporan Total Transaksi, hanya dapat dilakukan Bos dengan Access 'readAny'
routes.get('/kasir/report', AuthController.AuthCheck, AuthController.grantAccess('readAny','Transaksi'), KasirController.Laporan)

// Menampilkan Laporan Transaksi Kasir, hanya dapat dilakukan Bos dengan Access 'readAny'
routes.get('/kasir/logkasir', AuthController.AuthCheck, AuthController.grantAccess('readAny','Transaksi'), KasirController.KasirLog)

export default routes