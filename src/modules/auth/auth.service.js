const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRepository = require("./auth.repository");
const jwtConfig = require("../../config/jwt");

const UnauthorizedError = require("../../error/UnauthorizedError");
const ValidationError = require("../../error/ValidationError");

class AuthService {

    async login({ email, senha }) {

        if (!email || !senha) {
            throw new ValidationError("Email e senha são obrigatórios");
        }

        const usuario = await authRepository.buscarPorEmail(email);

        if (!usuario) {
            throw new UnauthorizedError("Credenciais inválidas");
        }

        if (usuario.status !== "ativo") {
            throw new UnauthorizedError("Usuário inativo");
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new UnauthorizedError("Credenciais inválidas");
        }

        const accessToken = jwt.sign(
            {
                id: usuario.id,
                role: usuario.role
            },
            jwtConfig.secret,
            { expiresIn: jwtConfig.expiresIn }
        );

        return {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role
            },
            accessToken
        };
    }
}

module.exports = new AuthService();