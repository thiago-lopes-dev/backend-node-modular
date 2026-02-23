const connection = require("./connection");

async function runMigrations() {
    try {
        console.log("🔄 Iniciando migrations...");

        // 🔐 Garantir extensão para UUID
        await connection.raw(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

        /* =====================================================
           👤 TABELA USUARIOS
        ===================================================== */
        const hasUsuarios = await connection.schema.hasTable("usuarios");

        if (!hasUsuarios) {
            await connection.schema.createTable("usuarios", (table) => {
                table
                    .uuid("id")
                    .primary()
                    .defaultTo(connection.raw("gen_random_uuid()"));

                table.string("nome").notNullable();
                table.string("email").notNullable().unique();
                table.string("senha").notNullable();

                table.string("role").notNullable().defaultTo("user");
                table.string("status").notNullable().defaultTo("ativo");

                table.string("refresh_token");

                table.timestamp("created_at").defaultTo(connection.fn.now());
                table.timestamp("updated_at").defaultTo(connection.fn.now());
                table.timestamp("deleted_at");
            });

            console.log("✅ Tabela usuarios criada");
        }

        /* =====================================================
           📜 TABELA LOGS
        ===================================================== */
        const hasLogs = await connection.schema.hasTable("logs");

        if (!hasLogs) {
            await connection.schema.createTable("logs", (table) => {
                table.increments("id").primary();

                table.string("metodo").notNullable();
                table.string("rota").notNullable();
                table.integer("status").notNullable();
                table.string("ip").notNullable();

                table.timestamp("criado_em").defaultTo(connection.fn.now());
            });

            console.log("✅ Tabela logs criada");
        }

        console.log("🚀 Migrations finalizadas com sucesso");
    } catch (error) {
        console.error("❌ Erro nas migrations:", error);
        throw error; // IMPORTANTE: propaga erro pro server.js
    }
}

module.exports = runMigrations;