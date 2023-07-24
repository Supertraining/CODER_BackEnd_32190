import winston, { format } from 'winston';

const { combine, prettyPrint, timestamp, errors } = winston.format;

const LEVEL = Symbol.for('level');
function filterOnly(level) {

	return format(function (info) {

		if (info[LEVEL] === level) {

			return info;

		}

	})();
}

const logger = winston.createLogger(
	
	{
		format: combine(errors({ stack: true }), timestamp(), prettyPrint()),
		transports: [
			new winston.transports.Console({ level: 'info', format: filterOnly('info') }),
			new winston.transports.File({ level: 'warn', format: filterOnly('warn'), filename: './log/warn.log' }),
			new winston.transports.File({ level: 'error', format: filterOnly('error'), filename: './log/error.log', }),
		],

	}

);

export const routeLogger = async (req, lvl, error) => {

	try {

		if (lvl == 'info') {

			logger.info(`Ruta ${req.method} ${req.url}`);

		} else if (lvl == 'warn') {

			logger.warn(`Ruta ${req.method} ${req.url} no esta implementada`);

		} else if (lvl == 'error') {

			logger.error(`Ha ocurrido un error en la ruta ${req.method} ${req.url}, ${error}`);

		}

	} catch (error) {

		logger.error(error);

	}
	
};

export default logger;
