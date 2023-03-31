import mongoose from 'mongoose';
import logger from '../Logger/Logger.js';

export const dbConnection = async (url) => {
    try {
        mongoose.set('strictQuery', true)
        let response = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info('Database MongoDb Atlas connected');
    } catch (err) {
        logger.error(err);
    }
}