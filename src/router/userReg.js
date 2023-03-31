
import { Router } from 'express'
import passport from 'passport'
import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt'
import { DAOusers } from '../../config/config.js'
import { logger } from '../logger.js'
import sendMail from '../nodemailer/mailSender.js'

const userReg = new Router()
const saltRounds = 10
const createHash = async (password) => {
    return await bcrypt.hash(password, saltRounds)
}

passport.use('register', new Strategy({
    passReqToCallback: true},
    async (req, username, password, done) => {
        const user = await DAOusers.getByUser(username)
        if (user) {
            logger.error('Usuario ya existe')
            return done(null, false)
        }
        const newUser = {
            user: req.body.username,
            password: await createHash(password),
            name: req.body.nameLastname,
            address: req.body.address,
            age: req.body.age,
            phone: req.body.phone,
            avatar: req.body.avatar
        }
        const savedUser = await DAOusers.save(newUser)
        const mailBodyTemplate =
            `
            <h3>Se ha creado un nuevo usuario</h3>
            <ul>
                <li>Mail:  ${newUser.user}</li>
                <li>Nombre y apellido:  ${newUser.name}</li>
                <li>Dirección:  ${newUser.address}</li>
                <li>Edad:  ${newUser.age}</li>
                <li>Teléfono:  ${newUser.phone}</li>
                <li>Avatar:  <img src='${newUser.avatar}' width='80px'></li>
            </ul>
            `
        sendMail(process.env.GMAILUSER, 'Nuevo registro', mailBodyTemplate)
        logger.info(`Nuevo usuario ${savedUser} creado con éxito`)
        return done(null, savedUser)
    }
))

userReg.get('/', (req, res) => {
    res.render('register')
})

userReg.post('/', passport.authenticate('register', {
    successRedirect: '/api/register/successreg',
    failureRedirect: '/api/register/failreg'
}))

userReg.get('/failreg', (req, res) => {
    res.render('failreg')
})

userReg.get('/successreg', (req, res) => {
    res.render('successreg')
})

export default userReg