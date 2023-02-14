import winston, { format } from 'winston';

const { combine, prettyPrint, timestamp } = winston.format;
const LEVEL = Symbol.for('level');
function filterOnly(level) {
	return format(function (info) {
		if (info[LEVEL] === level) {
			return info;
		}
	})();
}
const logger = winston.createLogger({
	format: combine(timestamp(), prettyPrint()),
	transports: [
		new winston.transports.Console({ level: 'info' }),
		new winston.transports.File({ level: 'warn', format: filterOnly('warn') ,filename: './log/warn.log' }),
		new winston.transports.File({ filename: './log/error.log', level: 'error' }),
	],
});

export const routeLogger = (req, lvl, msg) => {
	try {
		if (lvl == 'info') {
			logger.info(`Ruta ${req.method} ${req.url}`);
		} else if (lvl == 'warn') {
			logger.warn(`Ruta ${req.method} ${req.url} no esta implementada`);
		} else if (lvl == 'err') {
			logger.error('Ha ocurrido un error');
		}
	} catch (err) {
		logger.error(err);
	}
};

export default logger;
