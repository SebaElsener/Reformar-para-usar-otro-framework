
import { fork } from 'child_process'
import { infoLogger } from '../logger.js'
import { infoService } from '../business/infoBusiness.js'

const info = ctx => {
    const processInfo = infoService()
    if (process.env.INFOCONSOLE == 'ON') { infoLogger.info(processInfo) }
    ctx.response.render('info', { processInfo })
}

const randoms = ctx => {
    const randomNumbersFork = fork('./utils/randomNumbers.js')
    const numbersQty = ctx.query.cant || 500000
    randomNumbersFork.send(numbersQty)
    randomNumbersFork.on('message', (randomNumbersGenerated) => {
        ctx.response.render('random', { randomNumbersGenerated })
    })
}

export {
    info,
    randoms
}