
import {
    mainPage,
    getAllProducts,
    productById,
    addProduct,
    updateById,
    deleteById
} from '../business/ProductsBusiness.js'

const mainPageRender = async ctx => {
    const userName = ctx.session.passport.user
    const data = await mainPage(userName)
    ctx.session.admin = data.userData.admin
    ctx.response.render('index', {
        userName: userName,
        userData: data.userData,
        allProducts: data.productsList || ['Error'],
        productsQty: data.productsList.length
    })
}

const productsForm = async ctx => {
    ctx.render('./partials/form')
}

const getProductById = async ctx => {
    const productId = ctx.params.id
    if (productId === 'arrayproductos') {
        ctx.body = await getAllProducts(productId)
    } else {
    const searchedProduct = await productById(productId)
        ctx.response.json(searchedProduct)
    }
}

const postProduct = async ctx => {
    const product = ctx.request.body
    const addedProduct = await addProduct(product)
    ctx.body = addedProduct
    }

const updateProductById = async ctx => {
    const updateInfo = ctx.request.body
    const productId = ctx.params.id
    const updatedProduct = await updateById(productId, updateInfo)
    ctx.body = updatedProduct
}

const deleteProductById = async ctx => {
    const productId = ctx.params.id
    const deletedProduct = await deleteById(productId)
    ctx.body = deletedProduct
}

export {
    mainPageRender,
    productsForm,
    getProductById,
    postProduct,
    updateProductById,
    deleteProductById
}