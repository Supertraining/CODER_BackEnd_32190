import { routeLogger } from '../Logger/Logger.js';
import { numCPUs } from '../config/config.js';


export const info = async (ctx) => {
    try {
        ctx.body = {
            argumentos_de_entrada: process.argv.slice(2).join(' '),
            sistema_operativo: process.platform,
            version_de_Node: process.version,
            memoria_total_reservada: process.memoryUsage().rss,
            path_de_ejecucion: process.argv[0],
            process_id: process.pid,
            carpeta_del_proyecto: process.cwd(),
            numero_de_procesadores: numCPUs,
            puerto: process.env.PORT || 8080,
        };
        routeLogger(ctx.request, 'info');
    } catch (error) {
        routeLogger(ctx.request, 'error', error);
    }

}

export const infoBloq = async (ctx) => {
    console.log('RUTA BLOQUEANTE');
    ctx.body = {
        argumentos_de_entrada: process.argv.slice(2).join(' '),
        sistema_operativo: process.platform,
        version_de_Node: process.version,
        memoria_total_reservada: process.memoryUsage().rss,
        path_de_ejecucion: process.argv[0],
        process_id: process.pid,
        carpeta_del_proyecto: process.cwd(),
        numero_de_procesadores: numCPUs,
        puerto: process.env.PORT || 8080,
    };
    routeLogger(ctx.request, 'info');
}