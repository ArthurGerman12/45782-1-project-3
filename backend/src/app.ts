import express, { json } from 'express'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import config from 'config'
import sequelize from './db/sequelize';
import enforceAuth from './middlewares/enforce-auth';
import cors from 'cors'
import fileUpload from 'express-fileupload';
import feedRouter from './routers/feed'
import followRouter from './routers/follow'
import authRouter from './routers/auth'
import {hashAndSaltPassword} from './controllers/auth/controller'
import adminRouter from './routers/admin'

const app = express()


const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')

console.log(`app secret is ${secret}`)
console.log(hashAndSaltPassword("Password123"));

app.use(cors())

// post decipher middlewares
app.use(json())
app.use(fileUpload())


// load routers
app.use('/auth', authRouter)
app.use(enforceAuth)
app.use('/feed', feedRouter)
app.use('/follows', followRouter)
// app.use('/admin', adminRouter)


// not found
app.use(notFound)

// error middlewares
app.use(logger)
app.use(responder);


(async () => {
    // synchronize database schema (not data) changes to the database
    // i.e syncs our TypeScript models folder into the actual SQL Schema
    // sequelize.sync({ force: true })
    // await sequelize.sync({ force: process.argv[2] === 'sync' })
    sequelize.sync({ alter: true });

    
    console.log(process.argv)

    app.listen(port, () => console.log(`${appName} started on port ${port}`))
})()
