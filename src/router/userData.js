
import Router from 'koa-router'
import {
    renderUserData,
    getUser,
    updateUser,
    addCartToUser,
    purchaseOrder,
    usersAdmin,
    usersAdm,
    usersDelete
} from '../controller/userController.js'

const userData = new Router({
    prefix: '/api/userdata'
})

userData.get('/', renderUserData)

userData.get('/getuser', getUser)

userData.post('/', updateUser)

userData.put('/', addCartToUser)

userData.get('/purchaseorder', purchaseOrder)

userData.get('/usersadmin', usersAdmin)

userData.put('/usersadm', usersAdm)

userData.delete('/usersdelete', usersDelete)

export default userData