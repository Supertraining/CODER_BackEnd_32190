import { routeLogger } from '../logger/logger.js';
import { numCPUs } from '../config/config.js';

export const info = async (req, res) => {
    try {
        res.json({
            argumentos_de_entrada: process.argv.slice(2).join(' '),
            sistema_operativo: process.platform,
            version_de_Node: process.version,
            memoria_total_reservada: process.memoryUsage().rss,
            path_de_ejecucion: process.argv[0],
            process_id: process.pid,
            carpeta_del_proyecto: process.cwd(),
            numero_de_procesadores: numCPUs,
            puerto: process.env.PORT || 8080,
        });
        routeLogger(req, 'info');
    } catch (error) {
        routeLogger(req, 'error', error);
    }

}

export const infoBloq = async (req, res) => {
    console.log('RUTA BLOQUEANTE');
    res.json({
        argumentos_de_entrada: process.argv.slice(2).join(' '),
        sistema_operativo: process.platform,
        version_de_Node: process.version,
        memoria_total_reservada: process.memoryUsage().rss,
        path_de_ejecucion: process.argv[0],
        process_id: process.pid,
        carpeta_del_proyecto: process.cwd(),
        numero_de_procesadores: numCPUs,
        puerto: process.env.PORT || 8080,
    });
    routeLogger(req, 'info');
}