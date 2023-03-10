import logger, {routeLogger} from "../Logger/Logger.js";
import { saveFakerProducts } from "../services/faker.js";


export const getFakerProducts = async (req, res,) => {
	try {
        let fproducts = await saveFakerProducts();
        console.log(fproducts);
		res.render('fakeproducts', { fproducts: fproducts });
	} catch (error) {
		logger.error(error)
	}
	routeLogger(req, 'info')
};