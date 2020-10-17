import User from '../models/userModel.js'
import Kasir from './../models/kasirModel.js'

// Cetak semua transaksi
async function Laporan(req, res){
    const data = await Kasir.find({})

    await Kasir.aggregate([{
        $group: {
            _id: '',
            uang_masuk: { $sum: '$uang_masuk' },
            uang_keluar: { $sum: '$uang_keluar' },
        }
     }, {
        $project: {
            _id: 0,
            uang_masuk: '$uang_masuk',
            uang_keluar : '$uang_keluar',
            total : { $subtract:['$uang_masuk', '$uang_keluar'] },
        }
    }], function(err, user){
        if(err) return res.status(500).send("Tambah uang gagal")
            res.json({
                total: user,
                transaksi : data
            })
    })
}

// Menambahkan uang
async function UangMasuk(req,res){
    try{
        
        Kasir.create({
            user_id: res.locals.id,
            uang_masuk: req.body.uang_masuk,
        },
        function (err, user) {
            if(err) return res.status(500).send("Tambah uang gagal")

            
            res.json({
                message: 'Uang berhasil ditambahkan'
            })
        })
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}

// Mengambil uang (Role Bos)
async function UangKeluar(req,res){
    try{
        Kasir.create({
            user_id: res.locals.id,
            uang_keluar: req.body.uang_keluar,
        },
        function (err, user) {
            if(err) return res.status(500).send("Ambil uang gagal")

            
            res.json({
                message: 'Uang berhasil diambil'
            })
        })
    }
    catch (error) {
        res.status(500).json({ error: error })
    }
}
// Menampilkan seluruh log dari role kasir
async function KasirLog(req,res){
    try{
       // cek data pada document user join document kasir where role = kasir
        User.aggregate([ 
            {
                $match : 
                { 
                    "role" : "kasir" 
                }
            },
            {   
                $lookup: 
                {   
                    "from": "kasirs", 
                    "localField":"_id", 
                    "foreignField":"user_id", 
                    "as": "transaksi" 
                },
                
           }], function (err,user){
                    if(err) return res.status(500).send("Ambil uang gagal")
                
                    res.json({
                        transaction: user
                })
            })
    }catch(err){
        res.status(500).json({ error: err })
    }
}

export default { Laporan, UangMasuk, UangKeluar,KasirLog }