
import { errorLogger } from "../logger.js"

const routeError = async (ctx, next) => {
    if (ctx.response.status = 404) {
        const routeError = `Ruta '${ctx.path}' metodo '${ctx.method}' no implementada`
        errorLogger.warn(routeError)
        await ctx.render('routeError', {
            badRoute: routeError
        })
    }
    await next()
}

export default routeError