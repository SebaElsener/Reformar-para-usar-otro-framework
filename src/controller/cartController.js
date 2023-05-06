
import {
    getDataById,
    saveNewCart,
    addNewProductToCart,
    deleteProductFromCart,
    deleteCart,
    renderedCart,
    purchaseOrder
} from '../business/cartBusiness.js'

const getCartById = async ctx => {
    const cart = await getDataById(ctx.params.id)
    ctx.body = cart
}

const saveCart = async ctx => {
    const newCart = await saveNewCart()
    ctx.body = newCart
}

const addProductByIdAndCartId = async ctx => {
    const addedProduct = await addNewProductToCart(ctx.params.id_prod, ctx.params.id_cart)
    ctx.body = addedProduct
}

const deleteProductByIdAndCartId = async ctx => {
    const deletedProduct = await deleteProductFromCart(ctx.params.id_prod, ctx.params.id_cart)
    ctx.body = deletedProduct
}

const deleteCartById = async ctx => {
    const deletedCart = await deleteCart(ctx.params.id)
    ctx.body = deletedCart
}

const renderCart = async ctx => {
    const userName = ctx.session.passport.user
    const cartData = await renderedCart(userName)
    ctx.render('./partials/cart',
        {
            cart: cartData.cart,
            productsQty: cartData.cart.productos.length,
            userData: cartData.userData
        }
    )
}

const generatePurchaseOrder = async ctx => {
    const userName = ctx.session.passport.user
    const purchaseOrderData = await purchaseOrder(userName)
    ctx.render('./partials/purchaseOrder',
        {
            cart: purchaseOrderData.cart,
            userData: purchaseOrderData.userData
        }
    )
}

export {
    getCartById,
    saveCart,
    addProductByIdAndCartId,
    deleteProductByIdAndCartId,
    deleteCartById,
    renderCart,
    generatePurchaseOrder
}