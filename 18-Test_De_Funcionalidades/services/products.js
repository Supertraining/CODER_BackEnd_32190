import ProductRepo from '../repo/productRepo.js';
import logger from '../Logger/Logger.js';

export default class ProductServices {
    constructor() {
        this.productsService = new ProductRepo()
    }
    async getAll() {
        try {
            
            const productos = await this.productsService.getAll();
            return productos;

        } catch (error) {
            logger.error(error);
        }
    }

    async save(product) {
        try {
            const productId = await this.productsService.save(product);
            return productId;
        } catch (error) {
            logger.error(error);
        }
    }

    async delete(id) {
        try {
            const deleted = await this.productsService.delete(id);
            return deleted
        } catch (error) {
            logger.error(error);
        }
    }

    async update(product) {
        try {
            const updatedProduct = await this.productsService.update(product);
            return updatedProduct;
        } catch (error) {
            logger.error(error);
        }
    }

    async getById(id) {
        try {
            const data = await this.productsService.getById(id);
            return data;
        } catch (error) {
            logger.error(error);
        }
    }
}