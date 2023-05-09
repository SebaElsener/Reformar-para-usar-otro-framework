
import {
    getByUser,
    updateUserById,
    updateUserWithCart,
    purchase,
    getAllUsers,
    makeUsersAdmin,
    deleteUsers
} from '../business/userBusiness.js'

const renderUserData = async ctx => {
    const userName = ctx.session.passport.user
    ctx.render('userData', {
        userData: await getByUser(userName)
    })
}

const getUser = async ctx => {
    const userName = ctx.session.passport.user
    ctx.body = await getByUser(userName)
}

const updateUser = async ctx => {
    const userDBid = ctx.request.body.userDBid
    const userInfoToUpdate = {
        name: ctx.request.body.name,
        address: ctx.request.body.address,
        age: ctx.request.body.age,
        phone: ctx.request.body.phone,
        avatar: ctx.request.body.avatar
    }
    ctx.body = await updateUserById(userDBid, userInfoToUpdate)
}

const addCartToUser = async ctx => {
    const cartId = { cartId: ctx.request.body.cartId }
    const userId = ctx.request.body.userId
    ctx.body = updateUserWithCart(userId, cartId)
}

const purchaseOrder = async ctx => {
    const userName = ctx.session.passport.user
    const orderNbr = await purchase(userName)
    ctx.body = `Orden ${orderNbr} generada con exito`
}

const usersAdmin = async ctx => {
    const allUsers = await getAllUsers()
    ctx.render('partials/usersAdmin', {
        allUsers: allUsers
    })
}

const usersAdm = async ctx => {
    const users = ctx.request.body
    ctx.body = await makeUsersAdmin(users)
}

const usersDelete = async ctx => {
    console.log(ctx.request.body)
    const users = ctx.request.body
    ctx.body = await deleteUsers(users)
}

export {
    renderUserData,
    getUser,
    updateUser,
    addCartToUser,
    purchaseOrder,
    usersAdmin,
    usersAdm,
    usersDelete
}