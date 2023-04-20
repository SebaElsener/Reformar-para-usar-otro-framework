
import ContenedorFirebase from "../contenedores/contenedorFirebase.js"

let instance = null

class DAOproductsFirebase extends ContenedorFirebase {

    constructor (){
        super('products')
    }

    static getInstance () {
        if(!instance) { instance = new DAOproductsFirebase() }
        return instance
    }

}

export default DAOproductsFirebase