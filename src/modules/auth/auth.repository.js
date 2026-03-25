const connection = require("../../database/connection");

class AuthRepository {

    async buscarPorEmail(email) {
        return connection("usuarios")
            .where({ email })
            .whereNull("deleted_at")
            .first();
    }

    async salvarRefreshToken(userId, refreshToken) {
        return connection("usuarios")
            .where({ id: userId })
            .update({ refresh_token: refreshToken });
    }

}

module.exports = new AuthRepository();