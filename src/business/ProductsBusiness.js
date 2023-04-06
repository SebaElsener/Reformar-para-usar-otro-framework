
import { DAOproducts } from '../persistence/config/config.js'
import { DAOusers } from '../persistence/config/config.js'

const mainPage = async (userName) => {
    const productsList = await DAOproducts.getAll()
    const userData = await DAOusers.getByUser(userName)
    return {
        productsList: productsList,
        userData: userData
    }
}

const getAllProducts = async () => {
    return await DAOproducts.getAll()
}

const productById = async (reqParam) => {
    return await DAOproducts.getById(reqParam)
}

const addProduct = async (product, administrador) => {
    if (administrador) { return await DAOproducts.save(product) }
    return false
}

const updateById = async (productId, updateInfo, administrador) => {
    if (administrador) { return await DAOproducts.updateById(productId, updateInfo) }
    return false
}

const deleteById = async (productId, administrador) => {
    const productToDelete = await DAOproducts.getById(productId)
    if (administrador && productToDelete !== null) {
        return await DAOproducts.deleteById(productId)
    }
    return false
}

export {
    mainPage,
    getAllProducts,
    productById,
    addProduct,
    updateById,
    deleteById
}