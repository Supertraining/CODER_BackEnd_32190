import { faker } from '@faker-js/faker';
faker.locale = 'es';
import logger from '../Logger/Logger.js';

export default class MemoryContainer {
    constructor() {
        this.data = [];
    }
    async fakerProducts() {
        try {
            for (let i = 0; i < 5; i++) {
                this.data.push(
                    {
                        nombre: faker.commerce.product(),
                        precio: faker.commerce.price(100),
                        foto: faker.image.fashion(100, 150, true),
                    }
                );
            }
        } catch (err) {
            logger.error(err);
        }
        return this.data;
    }
}
