
import DAOproductsMongoDB from './DAO/DAOproductsMongoDB.js'
import DAOcarritoMongoDB from './DAO/DAOcarritoMongoDB.js'
import DAOusersMongoDB from './DAO/DAOusersMongoDB.js'
import DAOproductsFirebase from './DAO/DAOproductsFirebase.js'
import DAOcarritoFirebase from './DAO/DAOcarritoFirebase.js'
import DAOusersFirebase from './DAO/DAOusersFirebase.js'
import { infoLogger } from '../logger.js'
import _yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const yargs = _yargs(hideBin(process.argv))
const { DB } = yargs
    .default({
        DB: 'mongoDB'
    })
    .argv

//  Con la siguiente var elegimos el método de persistencia (pasado como argumento en línea de comando al iniciar server)
//  Según su valor se importan y exportan las instancias de las clases para la persistencia
const persistenceMethod = DB

infoLogger.info(`PERSISTENCIA: ${DB}`)

let DAOproducts = null
let DAOcarrito = null
let DAOusers = null

switch (persistenceMethod) {
    case 'mongoDB':
        DAOproducts = DAOproductsMongoDB.getInstance()
        DAOcarrito = DAOcarritoMongoDB.getInstance()
        DAOusers = DAOusersMongoDB.getInstance()
        break
    case 'firebase':
        DAOproducts = DAOproductsFirebase.getInstance()
        DAOcarrito = DAOcarritoFirebase.getInstance()
        DAOusers = DAOusersFirebase.getInstance()
        break
}

export { DAOproducts, DAOcarrito, DAOusers }