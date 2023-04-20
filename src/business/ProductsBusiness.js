
import { productsRepo } from '../persistence/factory.js'
import { DAOusers } from '../persistence/factory.js'

const mainPage = async (userName) => {
    const productsList = await productsRepo.getAll()
    const userData = await DAOusers.getByUser(userName)
    return {
        productsList: productsList,
        userData: userData
    }
}

const getAllProducts = async () => {
    return await productsRepo.getAll()
}

const productById = async (reqParam) => {
    return await productsRepo.getById(reqParam)
}

const addProduct = async (product, administrador) => {
    if (administrador) { return await productsRepo.save(product) }
    return false
}

const updateById = async (productId, updateInfo, administrador) => {
    if (administrador) { return await productsRepo.updateById(productId, updateInfo) }
    return false
}

const deleteById = async (productId, administrador) => {
    const productToDelete = await productsRepo.getById(productId)
    if (administrador && productToDelete !== null) {
        return await productsRepo.deleteById(productId)
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