const http = require("http");
const app = require("./app");
const envConfig = require("./config/env");
const connection = require("./database/connection");
const runMigrations = require("./database/migration");

const DEFAULT_PORT = Number(envConfig.PORT) || 8081;

async function startServer(port = DEFAULT_PORT) {
    try {
        /* =====================================================
           🗄️ TESTE DE CONEXÃO COM BANCO
        ===================================================== */
        await connection.raw("select 1+1 as result");
        console.log("🗄️ Banco de dados conectado com sucesso");

        /* =====================================================
           🔄 RODAR MIGRATIONS
        ===================================================== */
        await runMigrations();

        /* =====================================================
           🚀 INICIAR SERVIDOR
        ===================================================== */
        const server = http.createServer(app);

        server.on("error", (error) => {
            if (error.code === "EADDRINUSE") {
                console.warn(`❌ Porta ${port} já está em uso. Tentando ${port + 1}...`);
                startServer(port + 1);
            } else {
                console.error("❌ Erro no servidor:", error);
                process.exit(1);
            }
        });

        server.listen(port, () => {
            console.log("========================================");
            console.log("🚀 Servidor iniciado com sucesso");
            console.log(`🌎 Ambiente: ${envConfig.NODE_ENV}`);
            console.log(`📡 Porta: ${port}`);
            console.log(`🕒 Iniciado em: ${new Date().toISOString()}`);
            console.log("========================================");
        });

        /* =====================================================
           🛑 GRACEFUL SHUTDOWN
        ===================================================== */
        async function gracefulShutdown(signal) {
            console.log(`\n📴 Recebido ${signal}. Encerrando servidor...`);

            server.close(async () => {
                console.log("🛑 Servidor HTTP encerrado");

                try {
                    await connection.destroy();
                    console.log("🗄️ Conexão com banco encerrada");

                    console.log("✅ Encerramento completo");
                    process.exit(0);
                } catch (error) {
                    console.error("❌ Erro ao encerrar recursos:", error);
                    process.exit(1);
                }
            });

            setTimeout(() => {
                console.error("❌ Forçando encerramento por timeout");
                process.exit(1);
            }, 10000);
        }

        process.on("SIGINT", () => gracefulShutdown("SIGINT"));
        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    } catch (error) {
        console.error("❌ Falha ao iniciar servidor:", error);
        process.exit(1);
    }
}

startServer();