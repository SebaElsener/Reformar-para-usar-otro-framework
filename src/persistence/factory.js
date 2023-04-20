
import DAOproductsMongoDB from '../DAO/DAOproductsMongoDB.js'
import DAOcarritoMongoDB from '../DAO/DAOcarritoMongoDB.js'
import DAOusersMongoDB from '../DAO/DAOusersMongoDB.js'
import DAOproductsFirebase from '../DAO/DAOproductsFirebase.js'
import DAOcarritoFirebase from '../DAO/DAOcarritoFirebase.js'
import DAOusersFirebase from '../DAO/DAOusersFirebase.js'
import { infoLogger } from '../logger.js'
import _yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const yargs = _yargs(hideBin(process.argv))
const { DB } = yargs
    .default({
        DB: 'mongoDB'
    })
    .argv

infoLogger.info(`PERSISTENCIA: ${DB}`)

let DAOproducts = null
let DAOcarrito = null
let DAOusers = null
//  Con la siguiente var elegimos el método de persistencia.
//  Según su valor se exporta la instancia de las clases para la persistencia
const persistenceMethod = DB
switch (persistenceMethod) {
    case 'mongoDB':
        DAOproducts = new DAOproductsMongoDB()
        DAOcarrito = new DAOcarritoMongoDB()
        DAOusers = new DAOusersMongoDB()
        break
    case 'firebase':
        DAOproducts = new DAOproductsFirebase()
        DAOcarrito = new DAOcarritoFirebase()
        DAOusers = new DAOusersFirebase()
        break
}

export { DAOproducts, DAOcarrito, DAOusers }