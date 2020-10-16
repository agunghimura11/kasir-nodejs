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

// Mengambil uang
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

export default { Laporan, UangMasuk, UangKeluar }