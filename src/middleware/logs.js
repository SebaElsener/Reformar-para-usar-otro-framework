
import { logger } from '../logger.js'

export const logs = (req, res, next) => {
    logger.info(`ruta '${req.path}' método '${req.method}'`)
    next()
}