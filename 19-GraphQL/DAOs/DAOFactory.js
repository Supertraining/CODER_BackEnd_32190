import ProductsDAOMariaDB from './productsDAOMariaDB.js';
import { options } from '../config/config.js';
import MessagesDAOdb from './messagesDAO.js';

const opcion = process.argv[2];

let dao;

switch (opcion) {
    case 'Mongo':
        dao = { mssgDAO: MessagesDAOdb.getInstance() };
        break;
    case 'SQL':
        dao = { prodDAO: ProductsDAOMariaDB.getInstance(options, 'productos') };
        break;
    default:
        dao = {
            mssgDAO: MessagesDAOdb.getInstance(),
            prodDAO: ProductsDAOMariaDB.getInstance(options, 'productos')
        };
        break;
}

export default class DAOFactory {
    static getDao() {
        return dao
    }
}