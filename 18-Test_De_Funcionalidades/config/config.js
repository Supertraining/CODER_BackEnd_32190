import mongoStore from 'connect-mongo';
import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import parseArgs from 'minimist';
import os from 'os';

export const numCPUs = os.cpus().length;

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export const sessionConfig = {
    store: mongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        mongoOptions: advancedOptions,
        collectionName: 'sessions',
        ttl: 600,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}

export const mongoURL = process.env.MONGODB_URL;
	
export const options = {
	client: 'mysql',
	connection: {
		host: process.env.SQL_HOST,
		user: process.env.SQL_USERNAME,
		password: '',
		database: process.env.SQL_DATABASE,
	},
};

export const minimistConfig = {
	alias: {
		p: 'puerto',
		m: 'modo',
	},
	default: {
		puerto: 8080,
		modo: 'FORK',
	},
};

export const { puerto } = parseArgs(process.argv.slice(2), minimistConfig);
export const { modo } = parseArgs(process.argv.slice(3), minimistConfig);
