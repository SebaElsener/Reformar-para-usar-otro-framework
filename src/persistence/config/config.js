
import DAOproductsMongoDB from '../../DAO/DAOproductsMongoDB.js'
import DAOcarritoMongoDB from '../../DAO/DAOcarritoMongoDB.js'
import DAOproductsFirebase from '../../DAO/DAOproductsFirebase.js'
import DAOcarritoFirebase from '../../DAO/DAOcarritoFirebase.js'
import DAOusersMongoDB from '../../DAO/DAOusersMongoDB.js'

let DAOproducts = null
let DAOcarrito = null
let DAOusers = null
//  Con la siguiente var elegimos el método de persistencia.
//  Según su valor se exporta la instancia de las clases para la persistencia
const persistenceMethod = 'mongoDB'

switch (persistenceMethod) {
    case 'mongoDB':
        DAOproducts = new DAOproductsMongoDB()
        DAOcarrito = new DAOcarritoMongoDB()
        DAOusers = new DAOusersMongoDB()
        break
    case 'firebase':
        DAOproducts = new DAOproductsFirebase()
        DAOcarrito = new DAOcarritoFirebase()
        //DAOusers = new DAOusersMongoFirebase()  //  TODO
        break
}

export { DAOproducts, DAOcarrito, DAOusers }