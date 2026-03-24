const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");

const rateLimitMiddleware = require("./middlewares/ratelimit.middleware");
const ipFilterMiddleware = require("./middlewares/ipFilter.middleware");
const geoLocationMiddleware = require("./middlewares/geoLocation.middleware");
const loggerMiddleware = require("./middlewares/Logger.middleware");
const persistenciaMiddleware = require("./middlewares/persistencia.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const authRoutes = require("./modules/auth/auth.routes");
const usuarioRoutes = require("./modules/usuario/usuario.routes");

const envConfig = require("./config/env");

const app = express();

/* =====================================================
   🔐 SEGURANÇA BÁSICA
===================================================== */

// Proteções HTTP
app.use(helmet());

// CORS configurável
if (envConfig.NODE_ENV === "production") {
    app.use(cors({
        origin: envConfig.ALLOWED_ORIGINS || []
    }));
} else {
    app.use(cors());
}

// Compressão de resposta
app.use(compression());

// Log HTTP básico
if (envConfig.NODE_ENV !== "test") {
    app.use(morgan("dev"));
}

/* =====================================================
   📦 PARSERS
===================================================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* =====================================================
   🛡️ SEGURANÇA AVANÇADA
===================================================== */

// Rate limit global
app.use(rateLimitMiddleware);

// Filtro por IP
app.use(ipFilterMiddleware);

// Filtro por geolocalização
app.use(geoLocationMiddleware);

// Log customizado
app.use(loggerMiddleware);

// Persistência opcional de logs
if (envConfig.ENABLE_LOG_PERSISTENCE === "true") {
    app.use(persistenciaMiddleware);
}

/* =====================================================
   ❤️ HEALTH CHECK
===================================================== */

app.get("/health", (req, res) => {
    return res.status(200).json({
        status: "OK",
        environment: envConfig.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

/* =====================================================
   📚 ROTAS PRINCIPAIS
===================================================== */

app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);

/* =====================================================
   🚫 ROTA NÃO ENCONTRADA
===================================================== */

app.use((req, res, next) => {
    return res.status(404).json({
        erro: "Rota não encontrada"
    });
});

/* =====================================================
   ❌ TRATAMENTO GLOBAL DE ERRO
===================================================== */

app.use(errorMiddleware);

/* =====================================================
   🧠 TRATAMENTO DE ERROS GLOBAIS DO NODE
===================================================== */

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

module.exports = app;
