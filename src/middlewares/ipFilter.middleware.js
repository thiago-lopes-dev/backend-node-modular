const ForbiddenError = require("../error/ForbiddenError");
const securityConfig = require("../config/security");

function ipFilterMiddleware(req, res, next) {

    const { ipsPermitidos, ipsBloqueados } = securityConfig;

    const ip = req.ip;

    if (ipsBloqueados && ipsBloqueados.length > 0) {
        if (ipsBloqueados.includes(ip)) {
            throw new ForbiddenError("Seu IP está bloqueado");
        }
    }

    if (ipsPermitidos && ipsPermitidos.length > 0) {
        if (!ipsPermitidos.includes(ip)) {
            throw new ForbiddenError("IP não autorizado");
        }
    }

    next();
}

module.exports = ipFilterMiddleware;