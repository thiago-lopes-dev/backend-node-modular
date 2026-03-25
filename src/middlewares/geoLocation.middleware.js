const geoip = require("geoip-lite");
const ForbiddenError = require("../error/ForbiddenError");
const securityConfig = require("../config/security");

function geoLocationMiddleware(req, res, next) {

    const { paisesPermitidos, paisesBloqueados } = securityConfig;

    const ip = req.ip;
    const geo = geoip.lookup(ip);

    if (!geo) {
        return next();
    }

    const pais = geo.country;

    if (paisesBloqueados && paisesBloqueados.length > 0) {
        if (paisesBloqueados.includes(pais)) {
            throw new ForbiddenError("Acesso bloqueado para sua região");
        }
    }

    if (paisesPermitidos && paisesPermitidos.length > 0) {
        if (!paisesPermitidos.includes(pais)) {
            throw new ForbiddenError("Acesso não permitido para sua região");
        }
    }

    next();
}

module.exports = geoLocationMiddleware;