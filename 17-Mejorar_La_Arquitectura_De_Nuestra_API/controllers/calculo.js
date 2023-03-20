import { fork } from 'child_process'
import path from 'path'
import logger, { routeLogger } from '../logger/logger.js'


export const calcular = async (req, res) => {
    try {
        const calculo = fork(path.resolve('./services/calculo.js'))

        calculo.on('message', result => {

            if (result == 'listo') {
                calculo.send(Number(req.query?.cant) || Number(100000000))
            } else {
                res.json(result)
            }
        })
        routeLogger(req, 'info')
    } catch (error) {
        logger.error(error)
    }

}
