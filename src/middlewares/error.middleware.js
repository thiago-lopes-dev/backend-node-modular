const errorMiddleware = (err, req, res, next) => {
    console.error("🔥 ERRO REAL:", err);

    return res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
};

module.exports = errorMiddleware;