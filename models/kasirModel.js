import mongoose from 'mongoose'

const kasirSchema = mongoose.Schema (
    {
        user_id : {
            type: String,
            required: true,
        },
        uang_masuk : {
            type : Number,
            default : 0,
        },
        uang_keluar : {
            type : Number,
            default: 0,
        },
        total : {
            type : Number,
            default: 0,
        },
        transaction_date : {
            type : Date,
            default : Date.now,
        }
    },
    {
        timestamps: true
    }
)

const Kasir = mongoose.model('Kasir', kasirSchema)
export default Kasir