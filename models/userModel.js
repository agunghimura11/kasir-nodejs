import mongoose from 'mongoose'

const userSchema = mongoose.Schema (
    {
        username : {
            type: String,
            required: true,
        },
        password : {
            type : String,
            required: true,
        },
        lastname : {
            type : String,
            required: true,
        },
        role : {
            type : String,
            default : 'kasir',
            enum: ['kasir', 'manager', 'bos']
        },
        accessToken : {
            type : String
        }

    }
)

const User = mongoose.model('User', userSchema)
export default User