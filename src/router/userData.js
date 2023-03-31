
import { Router } from 'express'
import { DAOusers } from '../../config/config.js'
import { DAOcarrito } from '../../config/config.js'
import sendMail from '../nodemailer/mailSender.js'
import { logger } from '../logger.js'
import twilioSender from '../twilio/twilioMessage.js'

const userData = new Router()

userData.get('/', async (req, res) => {
    const userName = req.session.passport.user.user
    const userData = await DAOusers.getByUser(userName)
    res.render('userData', {
        userData: userData
    })
})

userData.get('/getuser', async (req, res) => {
    const userName = req.session.passport.user.user
    const userData = await DAOusers.getByUser(userName)
    res.json(userData)
})

userData.post('/', async (req, res) => {
    const userDBid = req.body._id
    const userInfoToUpdate = {
        nameLastname: req.body.nameLastname,
        address: req.body.address,
        age: req.body.age,
        phone: req.body.phone,
        avatar: req.body.avatar,
    }
    await DAOusers.updateById(userDBid, userInfoToUpdate)
    res.send('Usuario actualizado con éxito')
})

userData.put('/', async (req, res) => {
    const cartId = { cartId: req.body.cartId }
    const userId = req.body.userId
    const updatedUser = await DAOusers.updateById(userId, cartId)
    res.json(updatedUser)
})

userData.get('/purchaseorder', async (req, res) => {
    const userName = req.session.passport.user.user
    const userData = await DAOusers.getByUser(userName)
    const cart = await DAOcarrito.getById(userData.cartId)
    const mailBodyTemplate = cart.productos.map(product => {
        return `<div>
                    <div>
                        <p><span>Producto: </span>${product.product}</p>
                        <p><span>Precio: </span>$${product.price}</p>
                        <p><span>Descripción: </span>${product.description}</p>
                    </div>
                    <div>
                        <img src='${product.thumbnail}' alt='imagen producto' width='60px'>
                    </div>
                </div>
                `
    })
    const messageSubject = `Nuevo pedido de ${userData.name} - ${userData.user}`
    sendMail(process.env.GMAILUSER, messageSubject, mailBodyTemplate.join(''))
    const smsMessage = `Hola ${userData.name}!  Su orden de compra con ID ${userData.cartId} ha sido generada con éxito, nos pondremos en contacto con usted.  Muchas gracias`
    twilioSender(userData.phone, messageSubject, 'whatsapp')
    twilioSender(userData.phone, smsMessage, 'sms')
    logger.info(`Orden de compra con ID ${userData.cartId} generada con éxito`)
    res.send('Orden generada con éxito')
})

export default userData