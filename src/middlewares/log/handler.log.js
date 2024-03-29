
//? Gerarquía de niveles (Si pongo un nivel determinado, puedo acceder a los de nivel superior)
//? error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6

import { getLogger } from "./factory.log.js";

export const addLogger = async (req, res, next) => {
    const { logger }   = await getLogger();
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`);

    next();
};
