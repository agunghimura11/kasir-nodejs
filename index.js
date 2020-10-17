import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import routes from './routes.js'
import auth from './auth.js'

import jwt from 'jsonwebtoken'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}, (err) => {
    if(err) {
        throw err
    }else{
        console.log('Database connection established')
    }
})

const app = express()

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(express.json())

import Conf from './config.js'

// route untuk auth
app.use('/', auth)

// Middleware untu cek token
app.use((req, res, next) => {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];
        const { userId, exp } = jwt.verify(accessToken,  Conf.secret);
        // Jika token kadarluarsa
        if (exp < Date.now().valueOf() / 1000) { 
            return res.status(401).json({ error: "Jwt token kadarluarsa" });
        } 
        res.locals.id = userId;  next(); 
    } else { 
        next(); 
    } 
});
// router API
app.use('/api', routes)

app.listen(process.env.PORT, () => {
    console.log(`App listen to port ${process.env.PORT}`)
})