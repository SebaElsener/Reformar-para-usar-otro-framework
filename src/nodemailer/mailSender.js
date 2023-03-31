
import { createTransport } from 'nodemailer'
import { logger } from '../logger.js'

const sendMail = async (to, subject, message) => {
    const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.GMAILUSER,
            pass: process.env.GMAILUSERPASS,
        }
    })

    const mailOptions = {
        from: 'slelsener@gmail.com',
        to: to,
        subject: subject,
        html: message
    }

    try {
        const mail = await transporter.sendMail(mailOptions)
        logger.info(`Mail enviado con ID ${mail.messageId}`)
    } catch (error) {
        logger.error('Error al enviar mail', error)
    }

}

export default sendMail