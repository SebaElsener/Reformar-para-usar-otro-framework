
import { logger } from "../logger.js"

const routeError = (req, res, next) => {
    if (res.status = '404') {
        logger.warn(`ruta '${req.path}' método '${req.method}' no implementada`)
    }
    next()
}

export default routeError