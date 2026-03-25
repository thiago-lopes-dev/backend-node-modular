const knex = require("knex");
const envConfig = require("../config/env");

const connection = knex({
    client: "pg",
    connection: {
        host: envConfig.DB_HOST,
        port: envConfig.DB_PORT,
        user: envConfig.DB_USER,
        password: envConfig.DB_PASSWORD,
        database: envConfig.DB_NAME,
    },
    pool: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000
    },
    migrations: {
        tableName: "knex_migrations"
    }
});

module.exports = connection;