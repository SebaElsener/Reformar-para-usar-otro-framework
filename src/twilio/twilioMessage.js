
import twilio from 'twilio'
import { logger } from '../logger.js'

const accountSid = process.env.TWILIOACCOUNTSID
const authToken = process.env.TWILIOTOKEN

const client = twilio(accountSid, authToken)

const twilioSender = async (to, smsBody, type) => {
   try {
      const whatsappNbr = to.replace('+543487229250', 'whatsapp:+5493487229250')
      const from = type === 'whatsapp' ? 'whatsapp:+14155238886' : '+15856202393'
      const destNbr = type === 'whatsapp' ? whatsappNbr : to
      await client.messages.create({
         body: smsBody,
         from: from,
         to: destNbr,
      })
   } catch (error) {
      logger.error('Error al enviar SMS al cliente', error)
   }
}

export default twilioSender