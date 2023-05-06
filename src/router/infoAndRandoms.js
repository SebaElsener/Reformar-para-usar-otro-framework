
import Router from 'koa-router'
import { info, randoms } from '../controller/infoAndRamdomscontroller.js'

const infoAndRandoms = new Router({
    prefix: '/api/'
})

infoAndRandoms.get('/info', info)

infoAndRandoms.get('/randoms', randoms)

export default infoAndRandoms