import express, { json } from 'express'
import logger from './middlewares/error/logger';
import responder from './middlewares/error/responder';
import notFound from './middlewares/not-found';
import config from 'config'
import sequelize from './db/sequelize';
import enforceAuth from './middlewares/enforce-auth';
import cors from 'cors'
import feedRouter from './routers/feed'
import followRouter from './routers/follow'
import authRouter from './routers/auth'
import {hashAndSaltPassword} from './controllers/auth/controller'
import path from "path";




const app = express()
app.use('/images', express.static(__dirname + '/public/images'));



const port = config.get<number>('app.port')
const appName = config.get<string>('app.name')
const secret = config.get<string>('app.secret')

console.log(`app secret is ${secret}`)
console.log(hashAndSaltPassword("Password123"));

app.use(cors())

// post decipher middlewares
app.use(json())
const imagesPath = path.join(__dirname, '..', 'public', 'images');
app.use('/images', express.static(imagesPath));


// load routers
app.use('/auth', authRouter)
app.use(enforceAuth)
app.use('/feed', feedRouter)
app.use('/follows', followRouter)


// not found
app.use(notFound)

// error middlewares
app.use(logger)
app.use(responder);


(async () => {
    await sequelize.sync({ alter: true });
    app.listen(port, () => console.log(`${appName} started on port ${port}`))
})();
