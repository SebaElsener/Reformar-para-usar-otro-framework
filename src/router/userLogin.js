
import Router from 'koa-router'
import loginController from '../controller/loginController.js'

const userLogin = new Router({
    prefix: '/api/login'
})

userLogin.get('/', async ctx => {
    await ctx.render('login')
})

userLogin.post('/', loginController())

userLogin.get('/faillogin', async ctx => {
    await ctx.render('faillogin')
})

export default userLogin