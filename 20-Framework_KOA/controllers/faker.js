import logger, {routeLogger} from "../Logger/Logger.js";
import { saveFakerProducts } from "../services/faker.js";


export const getFakerProducts = async (ctx) => {
	try {
		let fproducts = await saveFakerProducts();
		routeLogger(ctx.request, 'info')
		return ctx.render('fakeproducts.ejs', { fproducts: fproducts });
	} catch (error) {
		logger.error(error)
	}
	
};