
import { Router as router} from 'express'
import { DAOproducts } from '../../config/config.js'
import { DAOusers } from '../../config/config.js'
import { logger } from '../logger.js'

const routeProducts = new router()

// Var para habilitar la modificación o alta de productos
const administrador = true

// Renderiza página pincipal
routeProducts.get('/', async (req, res) => {
    const productsList = await DAOproducts.getAll()
    const userName = req.session.passport.user.user
    const userData = await DAOusers.getByUser(userName)
    res.render('index', {
        admin: administrador,
        userName: userName,
        userData: userData,
        allProducts: productsList || ['Error'],
        productsQty: productsList.length
    })
})

routeProducts.get('/form', (req, res) => {
    res.render('./partials/form')
})

// devuelve un producto según su id
routeProducts.get('/:id', async (req, res) =>{
    if (req.params.id === 'arrayproductos') {
        const allProducts = await DAOproducts.getAll()
        res.json(allProducts)
    } else {
    const productById = await DAOproducts.getById(req.params.id)
    productById === null
        ? logger.error(`Producto con ID ${req.params.id} no existe`)
        : res.json(productById)
    }
})

// recibe y agrega un producto, y lo devuelve con su id asignado
routeProducts.post('/', async (req, res) =>{
    if (administrador) {
        const savedProduct = await DAOproducts.saveProduct(req.body)
        res.json(savedProduct)
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

// recibe y actualiza un producto según su id
routeProducts.put('/:id', async (req, res) =>{
    if (administrador) {
        const updateInfo = req.body
        const updatedProduct = await DAOproducts.updateById(req.params.id, updateInfo)
        res.json('Producto actualizado con éxito')
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

// elimina un producto según su id
routeProducts.delete('/:id', async (req, res) =>{
    if (administrador) {
        // almaceno el resultado de buscar el id para mostrar éxito o fallo al buscar id para eliminar
        const deletedId = await DAOproducts.getById(req.params.id)
        await DAOproducts.deleteById(req.params.id)
        deletedId === null
            ? logger.error(`Producto con ID ${req.params.id} no encontrado`)
            : res.json( {'Producto eliminado': deletedId.product} )
    } else {
        res.json({ error : -1, descripcion: 'Sólo administradores' })
    }
})

export default routeProducts