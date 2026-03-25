const AppError = require("./AppError");

class ValidationError extends AppError {
    constructor(message = "Dados inválidos") {
        super(message, 422);
    }
}

module.exports = ValidationError;