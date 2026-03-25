const authService = require("./auth.service");

class AuthController {

    async login(req, res, next) {
        try {
            const resultado = await authService.login(req.body);
            return res.json(resultado);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new AuthController();