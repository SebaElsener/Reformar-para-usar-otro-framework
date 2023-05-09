
import Router from 'koa-router'

const userLogout = new Router({
    prefix: '/api/logout'
})

userLogout.get('/', ctx => {
    ctx.session = null
    if (!ctx.session) {
        ctx.render('logout')
    } else { ctx.redirect('/api/home') }
})

export default userLogout