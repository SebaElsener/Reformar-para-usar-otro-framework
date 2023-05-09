
import Router from 'koa-router'
import regController from '../controller/userRegController.js'

const userReg = new Router({
    prefix: '/api/register'
})

userReg.get('/', async ctx => {
    await ctx.render('register')
})

userReg.post('/', regController())

userReg.get('/failreg', async ctx => {
    await ctx.render('failreg')
})

userReg.get('/successreg', async ctx => {
    await ctx.render('successreg')
})

export default userReg