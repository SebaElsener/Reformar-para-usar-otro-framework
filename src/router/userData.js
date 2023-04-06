
import { Router } from 'express'

import {
    renderUserData,
    getUser,
    updateUser,
    addCartToUser,
    purchaseOrder,
    usersAdmin
} from '../controller/userController.js'

const userData = new Router()

userData.get('/', renderUserData)

userData.get('/getuser', getUser)

userData.post('/', updateUser)

userData.put('/', addCartToUser)

userData.get('/purchaseorder', purchaseOrder)

userData.get('/usersadmin', usersAdmin)

export default userData