const AppError = require("../error/AppError");

class UnauthorizedError extends AppError {
    constructor(message = "Não autenticado") {
        super(message, 401);
    }
}

module.exports = UnauthorizedError;