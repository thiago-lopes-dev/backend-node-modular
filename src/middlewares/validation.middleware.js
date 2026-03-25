const ValidationError = require("../errors/ValidationError");

function validationMiddleware(campos = []) {

    return (req, res, next) => {

        const erros = [];

        campos.forEach((campo) => {
            if (!req.body[campo]) {
                erros.push(`Campo ${campo} é obrigatório`);
            }
        });

        if (erros.length > 0) {
            throw new ValidationError(erros.join(", "));
        }

        next();
    };
}

module.exports = validationMiddleware;