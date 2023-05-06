
import { infoLogger } from '../logger.js'

export const logs = async (ctx, next) => {
    infoLogger.info(`ruta '${ctx.path}' metodo '${ctx.method}'`)
    await next()
}