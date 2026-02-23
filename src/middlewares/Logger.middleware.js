function loggerMiddleware(req, res, next) {

    const inicio = Date.now();

    res.on("finish", () => {
        const tempo = Date.now() - inicio;

        console.log({
            metodo: req.method,
            rota: req.originalUrl,
            status: res.statusCode,
            tempoMs: tempo,
            ip: req.ip,
            timestamp: new Date().toISOString()
        });
    });

    next();
}

module.exports = loggerMiddleware;