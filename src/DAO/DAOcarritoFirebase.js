

import ContenedorFirebase from "../persistence/contenedores/contenedorFirebase.js"

class DAOcarritoFirebase extends ContenedorFirebase {

    constructor (){
        super('carts')
    }

}

export default DAOcarritoFirebase