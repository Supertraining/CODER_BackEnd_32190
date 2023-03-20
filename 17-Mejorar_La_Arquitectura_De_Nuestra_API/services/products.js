import ProductRepo from '../repo/productRepo.js';

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
            const productos = await this.productsService.save(product);
            return productos;
        } catch (error) {
            logger.error(error);
        }
    }

    async delete(id) {
        try {
            return await this.productsService.delete(id);
        } catch (error) {
            logger.error(error);
        }
    }

    async update(product) {
        try {
            return await this.productsService.update(product);
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