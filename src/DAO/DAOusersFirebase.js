
import ContenedorFirebase from "../persistence/contenedores/contenedorFirebase.js"

class DAOusersFirebase extends ContenedorFirebase {

    constructor (){
        super('users')
    }

}

export default DAOusersFirebase