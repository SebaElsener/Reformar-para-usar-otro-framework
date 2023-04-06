
import { DAOusers } from '../persistence/config/config.js'
import { DAOcarrito } from '../persistence/config/config.js'
import sendMail from '../nodemailer/mailSender.js'
import { infoLogger } from '../logger.js'
import twilioSender from '../twilio/twilioMessage.js'

const getByUser = async (userName) => {
    return await DAOusers.getByUser(userName)
}

const getAllUsers = async () => {
    return await DAOusers.getAll()
}

const updateUserById = async (userDBid, userInfoToUpdate) => {
    return await DAOusers.updateById(userDBid, userInfoToUpdate)
}

const updateUserWithCart = async (userId, cartId) => {
    return await DAOusers.updateById(userId, cartId)
}

const purchase = async (userName) => {
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
    const smsMessage = `Hola ${userData.name}!  Su orden de compra con ID ${userData.cartId}\
        ha sido generada con éxito, nos pondremos en contacto con usted.  Muchas gracias`
    twilioSender(userData.phone, messageSubject, 'whatsapp')
    twilioSender(userData.phone, smsMessage, 'sms')
    infoLogger.info(`Orden de compra con ID ${userData.cartId} generada con éxito`)
    return userData.cartId
}

export {
    getByUser,
    updateUserById,
    updateUserWithCart,
    purchase,
    getAllUsers
}