const rateLimit = require("express-rate-limit");
const rateLimitConfig = require("../config/rateLimit");

const limiter = rateLimit({
    windowMs: rateLimitConfig.windowMs,
    max: rateLimitConfig.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        erro: "Muitas requisições. Tente novamente mais tarde."
    },
    handler: (req, res) => {
        return res.status(429).json({
            erro: "Limite de requisições excedido",
            ip: req.ip,
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = limiter;