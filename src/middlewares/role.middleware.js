const ForbiddenError = require("../error/ForbiddenError");

function autorizarRole(...rolesPermitidas) {

    return (req, res, next) => {

        if (!req.usuario) {
            throw new ForbiddenError("Usuário não autenticado");
        }

        if (!rolesPermitidas.includes(req.usuario.role)) {
            throw new ForbiddenError("Acesso negado");
        }

        next();
    };
}

module.exports = autorizarRole;