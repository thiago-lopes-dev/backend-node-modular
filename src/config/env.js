require("dotenv").config();

function getEnv(name, defaultValue = null) {
    const value = process.env[name];

    if (!value && defaultValue === null) {
        console.warn(`⚠️ Variável de ambiente ${name} não definida`);
    }

    return value || defaultValue;
}

module.exports = {
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", 8081),

    DB_HOST: getEnv("DB_HOST", "*****"),
    DB_PORT: getEnv("DB_PORT", "****"), 
    DB_USER: getEnv("DB_USER", "*****"),
    DB_PASSWORD: getEnv("DB_PASSWORD", "***"),
    DB_NAME: getEnv("DB_NAME", "****"),

    JWT_SECRET: getEnv("JWT_SECRET", "super_secret_key"),
    JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1h"),

    ENABLE_LOG_PERSISTENCE: getEnv("ENABLE_LOG_PERSISTENCE", "true"),

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : []
};
