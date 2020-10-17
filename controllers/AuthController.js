import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from './../models/userModel.js'

import Conf from './../config.js'

import roles from './../roles.js'

// register new user
function register(req, res) {
    try {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8)
        
        User.create({
            username: req.body.username,
            lastname: req.body.lastname,
            password: hashedPassword,
            role : req.body.role,
        },
        function (err, user) {
            if(err) throw(err)

            var accessToken = jwt.sign({ userId: user._id }, Conf.secret, {
                // 1 menit -> 60 second, 20 menit -> 1200 second
                expiresIn : 3600 // 1 jam 
            })
    
            User.accessToken = accessToken
  
            res.status(200).send({
                data: User,
                accessToken
            })
        })
    } catch (error) {
       throw (error)
    }
}
// validasi password 
async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// login user untuk mendapatkan token
async function login(req, res, next) {
    try {
     const { 
         username, password 
     } = req.body

     const user = await User.findOne({ username });
     
     if (!user) 
        return next(new Error('Username does not exist'));
     
     const validPassword = await validatePassword(password, user.password);
     
     if (!validPassword) return next(new Error('Password is not correct'))
     
     var accessToken = jwt.sign({ userId: user._id }, Conf.secret, {
        // 1 menit -> 60 second, 20 menit -> 1200 detik
        expiresIn : 3600 // 1 jam 
     })

     // Update token terbaru
     await User.findByIdAndUpdate(user._id, { accessToken })

     res.status(200).json({
      data: { username: user.username, role: user.role },
      accessToken
     })
    } catch (error) {
        throw(error)
    }
}

// untuk cek access role (action, resource). Role terdapat pada roles.js
function grantAccess(action, resource) {
    return async (req, res, next) => {
        try {
            if(!req.user.role){
                return res.status(401).json({
                    error: "Silahkan login terlebih dahulu"
                });
            }
        
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "Tidak memiliki hak akses"
                });
            }
                next()
        } catch (error) {
            next(error)
        }
    }
}
// cek apakah sudah login? id login didapat pada middleware get token
async function AuthCheck(req, res, next){
    try {
        const _id = res.locals.id
        const user = await User.findOne({ _id })
        if (!user)
            return res.status(401).json({
                 error: "You need to be logged in to access this route"
            });
        req.user = user;
        
        next();
    } catch (error) {
        next(error);
    }
}


export default { register, login, AuthCheck, grantAccess }