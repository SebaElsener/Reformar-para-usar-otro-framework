
import Koa from 'koa'
import { koaBody } from 'koa-body'
import userLogin from './router/userLogin.js'
import homeRoute from './router/homeRoute.js'
import userReg from './router/userReg.js'
import routeProducts from './router/productsRouter.js'
import routeCart from './router/cartRouter.js'
import userLogout from './router/userLogout.js'
import infoAndRandoms from './router/infoAndRandoms.js'
import userData from './router/userData.js'
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import session from 'koa-session'
import passport from 'koa-passport'
import _yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import dotenv from 'dotenv'
import cluster from 'cluster'
import * as os from 'os'
import routeError from './middleware/routeError.js'
import { logs } from './middleware/logs.js'
import { infoLogger, errorLogger } from './logger.js'
import views from 'koa-views'
import serve from 'koa-static'
import MessageRepository from './persistence/repository/messageRepository.js'
import normalizeMessages from './normalize/normalize.js'
import MongooseStore from 'koa-session-mongoose'

dotenv.config()

const yargs = _yargs(hideBin(process.argv))
const app = new Koa()
const httpServer = new HttpServer(app.callback())
const io = new Socket(httpServer)

app.use(serve('public'))
const render = views('./public/views', { extension: 'ejs' })
app.use(render)
app.use(koaBody())

app.keys = [process.env.SECRET]
app.use(session({
    store: new MongooseStore({
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        // Tiempo de expiración 10 min
        maxAge: 600000
    }
}, app))

passport.serializeUser((user, done) => {
    done(null, user)
  })
passport.deserializeUser((user, done) => {
    done(null, user)
})
app.use(passport.initialize())
app.use(passport.session())

// Middleware para registrar todas la peticiones recibidas
app.use(logs)

// Rutas api
app.use(userLogin.routes())
app.use(routeProducts.routes())
app.use(routeCart.routes())
app.use(userData.routes())
app.use(userLogout.routes())
app.use(userReg.routes())
app.use(homeRoute.routes())
app.use(infoAndRandoms.routes())

// Middleware para mostrar error al intentar acceder a una ruta/método no implementados
app.use(routeError)

const messages = MessageRepository.getInstance()
io.on('connection', async socket => {
    infoLogger.info('Nuevo cliente conectado!')
    // Envío listado completo de mensajes a todos los clientes conectados
    io.sockets.emit('allMessages', {
        normalizedMessages: normalizeMessages(await messages.getAll()),
        originalDataLength: JSON.stringify(await messages.getAll()).length
    })
    // Escuchando y guardando nuevos mensajes
    socket.on('newMessage', async data => {
        await messages.save(data)
        io.sockets.emit('allMessages', {
            normalizedMessages: normalizeMessages(await messages.getAll()),
            originalDataLength: JSON.stringify(await messages.getAll()).length
        })
    })
})

const { PORT, clusterMode } = yargs
    .alias({
        p: 'PORT',
        m: 'clusterMode'
    })
    .default({
        PORT: 8080,
        clusterMode: 'FORK'
    })
    .argv

if (clusterMode === 'CLUSTER' && cluster.isPrimary) {
    const CPUsQty = os.cpus().length

    infoLogger.info('SERVIDOR PRIMARIO DEL CLUSTER')
    infoLogger.info('Número de procesadores: ' + CPUsQty)
    infoLogger.info('PID:' + process.pid)

    for (let i = 0; i < CPUsQty; i++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        infoLogger.info(`Worker ${worker.process.pid} died on ${new Date().toLocaleString()}`)
        cluster.fork()
    })
} else {
    const connectedServer = httpServer.listen(PORT, () => {
        infoLogger.info(`http server escuchando en puerto ${connectedServer.address().port}`)
    })
    connectedServer.on('error', error => errorLogger.error(`Error en servidor ${error}`))
}