
import Router from 'koa-router'

const homeRoute = new Router({
    prefix: '/api/home'
})

homeRoute.get('/', ctx => {
    ctx.response.redirect('/api/productos')
})

export default homeRoute