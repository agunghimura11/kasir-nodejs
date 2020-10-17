# Dokumentasi API Kasir 

## Setting .env file
    PORT= 
    MONGODB_URI=

## Proses 
1. Register user untuk mendapatkan token (Role "bos", "kasir", "manager") 
2. Login menggunakan username dan password yang sudah didaftarkan, serta token (expired 1 jam)
3. Token dimasukan di bagian header dengan variable [x-access-token]
4. Setiap API diakses menggunakan token

Dokumentasi API (https://documenter.getpostman.com/view/12884785/TVRrVQGZ)

