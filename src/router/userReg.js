
import Router from 'koa-router'
import regController from '../controller/userRegController.js'

const userReg = new Router({
    prefix: '/api/register'
})

userReg.get('/', ctx => {
    ctx.response.render('register')
})

userReg.post('/', regController())

userReg.get('/failreg', ctx => {
    ctx.response.render('failreg')
})

userReg.get('/successreg', ctx => {
    ctx.response.render('successreg')
})

export default userReg