
import {
    mainPage,
    getAllProducts,
    productById,
    addProduct,
    updateById,
    deleteById
} from '../business/ProductsBusiness.js'

const mainPageRender = async (req, res) => {
    const userName = req.session.passport.user
    const data = await mainPage(userName)
    req.session.admin = data.userData.admin
    res.render('index', {
        userName: userName,
        userData: data.userData,
        allProducts: data.productsList || ['Error'],
        productsQty: data.productsList.length
    })
}

const productsForm = async (req, res) => {
    res.render('./partials/form')
}

const getProductById = async (req, res) =>{
    const productId = req.params.id
    if (productId === 'arrayproductos') {
        res.json(await getAllProducts(productId))
    } else {
    const searchedProduct = await productById(productId)
        res.json(searchedProduct)
    }
}

const postProduct = async (req, res) =>{
    const product = req.body
    const administrador = req.session.admin
    const addedProduct = await addProduct(product, administrador)
    addedProduct
        ? res.json(addedProduct)
        : res.json({ error : -1, descripcion: 'Sólo administradores' })
    }

const updateProductById = async (req, res) =>{
    const updateInfo = req.body
    const productId = req.params.id
    const administrador = req.session.admin
    const updatedProduct = await updateById(productId, updateInfo, administrador)
    updatedProduct
        ? res.json(updatedProduct)
        : res.json({ error : -1, descripcion: 'Sólo administradores' })
}

const deleteProductById = async (req, res) =>{
    const productId = req.params.id
    const administrador = req.session.admin
    const deletedProduct = deleteById(productId, administrador)
    deletedProduct
        ? res.json(deletedProduct)
        : res.json({ error : -1, descripcion: 'Sólo administradores' })
}

export {
    mainPageRender,
    productsForm,
    getProductById,
    postProduct,
    updateProductById,
    deleteProductById
}