const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const UnauthorizedError = require("../error/UnauthorizedError");
const connection = require("../database/connection");

async function authMiddleware(req, res, next) {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedError("Token não fornecido");
        }

        if (!authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError("Formato do token inválido");
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new UnauthorizedError("Token inválido");
        }

        let decoded;

        try {
            decoded = jwt.verify(token, jwtConfig.secret);
        } catch (err) {
            throw new UnauthorizedError("Token inválido ou expirado");
        }

        const usuario = await connection("usuarios")
            .where({ id: decoded.id })
            .whereNull("deleted_at")
            .first();

        if (!usuario) {
            throw new UnauthorizedError("Usuário não encontrado");
        }

        if (usuario.status !== "ativo") {
            throw new UnauthorizedError("Usuário inativo");
        }

        req.usuario = {
            id: usuario.id,
            role: usuario.role,
            email: usuario.email
        };

        next();

    } catch (error) {
        next(error);
    }
}

module.exports = authMiddleware;