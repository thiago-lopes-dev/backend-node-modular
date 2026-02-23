const connection = require("../database/connection");

async function persistenciaMiddleware(req, res, next) {

    res.on("finish", async () => {
        try {
            await connection("logs").insert({
                metodo: req.method,
                rota: req.originalUrl,
                status: res.statusCode,
                ip: req.ip,
                criado_em: new Date()
            });
        } catch (error) {
            console.error("Erro ao salvar log:", error.message);
        }
    });

    next();
}

module.exports = persistenciaMiddleware;