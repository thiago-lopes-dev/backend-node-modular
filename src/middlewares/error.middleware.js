const envConfig = require("../config/env");

const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // era sempre 500
    const isProd = envConfig.NODE_ENV === "production";

    if (!err.isOperational) {
        console.error("🔥 ERRO INESPERADO:", err);
    }

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Erro interno do servidor",
        ...(isProd ? {} : { stack: err.stack })
    });
};

module.exports = errorMiddleware;