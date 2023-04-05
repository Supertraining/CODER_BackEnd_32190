import { fork } from 'child_process'
import path from 'path'
import logger, { routeLogger } from '../Logger/Logger.js'


export const calcular = async (ctx) => {
    try {
        const calculo = await fork(path.resolve('./services/calculo.js'))

        calculo.on('message', async result => {

            if (result == 'listo') {
               await calculo.send(Number(ctx.request.query?.cant) || Number(100000000))
            } else {
                return ctx.body = await result;
            }
        })
        routeLogger(ctx.request, 'info')
    } catch (error) {
        logger.error(error)
    }

}
