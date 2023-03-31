import ProductRepo from '../repo/productRepo.js';
import logger from '../Logger/Logger.js';

export default class ProductServices {
    constructor() {
        this.productsService = new ProductRepo()
    }
    getAll = async () => {
        try {
            const productos = await this.productsService.getAll();
            return productos;
        } catch (error) {
            logger.error(error);
        }
    }

    save = async (product) => {

        try {
            let data = null
            if (typeof(product) === 'object') {
                data = product.product
            } else {
                data = product
            }
            const productId = await this.productsService.save(data);
            return productId;
        } catch (error) {
            logger.error(error);
        }
    }

    delete = async (id) => {
        try {
            let ident = null
            if (typeof (id) === 'object') {
                ident = id.id
            } else {
                ident = id
            }
            const deleted = await this.productsService.delete(ident);
            return deleted
        } catch (error) {
            logger.error(error);
        }
    }

    update = async (product) => {     
        try {
            let data = null
            if (typeof(product) === 'object') {
                data = {id: product.id, ...product.product}
            } else {
                data = product
            }
            const updatedProduct = await this.productsService.update(data);
            return updatedProduct;
        } catch (error) {
            logger.error(error);
        }
    }
    getById = async (id) => {
        try {
            let ident = null
            if (typeof (id) === 'object') {
                ident = id.id
            } else {
                ident = id
            }
            const data = await this.productsService.getById(ident);
            return data;
        } catch (error) {
            logger.error(error);
        }
    }
}