
import ContenedorFirebase from "../persistence/contenedores/contenedorFirebase.js"

class DAOproductsFirebase extends ContenedorFirebase {

    constructor (){
        super('products')
    }

}

export default DAOproductsFirebase